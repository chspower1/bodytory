import { useCallback, useState } from "react";

import customApi from "@utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { json } from "stream/consumers";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function audioBufferToWav(aBuffer: AudioBuffer) {
  let numOfChan = aBuffer.numberOfChannels,
    btwLength = aBuffer.length * numOfChan * 2 + 44,
    btwArrBuff = new ArrayBuffer(btwLength),
    btwView = new DataView(btwArrBuff),
    btwChnls = [],
    btwIndex,
    btwSample,
    btwOffset = 0,
    btwPos = 0;
  setUint32(0x46464952); // "RIFF"
  setUint32(btwLength - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"
  setUint32(0x20746d66); // "fmt " chunk
  setUint32(16); // length = 16
  setUint16(1); // PCM (uncompressed)
  setUint16(numOfChan);
  setUint32(aBuffer.sampleRate);
  setUint32(aBuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
  setUint16(numOfChan * 2); // block-align
  setUint16(16); // 16-bit
  setUint32(0x61746164); // "data" - chunk
  setUint32(btwLength - btwPos - 4); // chunk length

  for (btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++) btwChnls.push(aBuffer.getChannelData(btwIndex));

  while (btwPos < btwLength) {
    for (btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
      // interleave btwChnls
      btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])); // clamp
      btwSample = (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) | 0; // scale to 16-bit signed int
      btwView.setInt16(btwPos, btwSample, true); // write 16-bit sample
      btwPos += 2;
    }
    btwOffset++; // next source sample
  }

  function setUint16(data: any) {
    btwView.setUint16(btwPos, data, true);
    btwPos += 2;
  }

  function setUint32(data: any) {
    btwView.setUint32(btwPos, data, true);
    btwPos += 4;
  }
  return btwArrBuff;
}

const resample = async (input_buffer: any, target_rate: any) => {
  const len = input_buffer.length;
  const src_rate = input_buffer.sampleRate;
  const target_len = len * (target_rate / src_rate);
  const c = new OfflineAudioContext(1, target_len, target_rate);
  const b = c.createBuffer(1, len, src_rate);
  b.copyToChannel(input_buffer.getChannelData(0), 0);
  const s = c.createBufferSource();
  s.buffer = b;
  s.connect(c.destination);
  s.start();
  return await c.startRendering();
};

const bufferToBase64 = (buffer: any) => {
  const bytes = new Uint8Array(buffer);
  const len = buffer.byteLength;
  let binary = "";
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const useAudio = () => {
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();

  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [analyser, setAnalyser] = useState<ScriptProcessorNode>();
  const [audioUrl, setAudioUrl] = useState<Blob>();

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const onRecAudio = () => {
    SpeechRecognition.startListening({ continuous: true, language: "ko" });
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new window.AudioContext({ sampleRate: 16000 });
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);
    function makeSound(stream: MediaStream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      // AudioBufferSourceNode 연결
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득 후 녹음 시작
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
    });
  };

  const offRecAudio = () => {
    SpeechRecognition.stopListening();
    if (media) {
      // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
      media.ondataavailable = function (e) {
        setAudioUrl(e.data);
      };
      stream?.getAudioTracks().forEach(function (track) {
        track.stop();
      });
      media.stop();
      analyser?.disconnect();
      source?.disconnect();
    }
  };

  const onSubmitAudioFile = useCallback(async () => {
    const reader = new FileReader();
    const sound = new Blob([audioUrl as BlobPart], { type: "audio/mpeg3" });
    reader.readAsArrayBuffer(sound);

    reader.onloadend = async () => {
      const audioContext = new AudioContext();
      const arrayBuffer = reader.result;
      const bufferedSound = await audioContext.decodeAudioData(arrayBuffer as ArrayBuffer);
      const resampled = await resample(bufferedSound, 16000);
      const reBlob = audioBufferToWav(resampled);

      const PostAudio = async () => {
        const aa = await fetch("http://aiopen.etri.re.kr:8000/WiseASR/Recognition", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "8b10a352-acfc-483c-9816-52dbdc37181a",
          },
          body: JSON.stringify({
            request_id: "chspower1@naver.com",
            argument: {
              language_code: "korean",
              audio: bufferToBase64(reBlob),
            },
          }),
        })
          .then(data => data.json())
          .catch(err => console.log(err));
        console.log(aa);
      };
      PostAudio();
    };
  }, [audioUrl]);

  const startRecord = useCallback(() => {
    onRecAudio();
  }, []);

  const endRecord = useCallback(async () => {
    await onSubmitAudioFile();
    offRecAudio();
    resetTranscript();
  }, []);

  const RecordBtn = () => {
    return (
      <div style={{ margin: "400px" }}>
        {/* <button onClick={isRecording ? offRecAudio : onRecAudio}>녹음</button>
        <div>{isRecording ? "녹음중" : "대기"}</div>
        <button onClick={onSubmitAudioFile}>결과 확인</button>
        <audio controls src={audioBlobUrl} /> */}

        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={() => (listening ? startRecord() : endRecord())}>{listening ? "End" : "Start"}</button>
        <button onClick={() => resetTranscript()}>Reset</button>
        <p>{transcript}</p>
      </div>
    );
  };
  return { startRecord, endRecord, transcript, listening, RecordBtn };
};

export default useAudio;
