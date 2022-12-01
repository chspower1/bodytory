import { useCallback, useEffect, useState } from "react";

import customApi from "@utils/client/customApi";
import { useMutation } from "@tanstack/react-query";

const bufferToBase64 = (buffer: any) => {
  const bytes = new Uint8Array(buffer);
  const len = buffer.byteLength;
  let binary = "";
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const resample = async (input_buffer: any, target_rate: any) => {
  const len = input_buffer.length;
  const src_rate = input_buffer.sampleRate;
  // New sampleRate requires adjusted buffer length to retain duration
  const target_len = len * (target_rate / src_rate);

  // Until better support for `AudioContext({sampleRate}),
  // use `OfflineAudioContext` which supports setting the sampleRate
  const c = new OfflineAudioContext(1, target_len, target_rate);

  // Copy the`AudioContext` buffer so `OfflineAudioContext` can use it
  const b = c.createBuffer(1, len, src_rate);
  b.copyToChannel(input_buffer.getChannelData(0), 0);

  // Setup the audio graph to render (input buffer resampled into output buffer)
  const s = c.createBufferSource();
  s.buffer = b;
  s.connect(c.destination);
  s.start();

  return await c.startRendering();
};

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

const useAudio = () => {
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();

  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [analyser, setAnalyser] = useState<ScriptProcessorNode>();
  const [audioUrl, setAudioUrl] = useState<Blob | MediaSource>();
  const [audioBlobUrl, setAudioBlobUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File>();
  const [audioRecognized, setAudioRecognized] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);

  const onRecAudio = useCallback(() => {
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
        audioBitsPerSecond: 16000,
        mimeType: "audio/webm",
      });
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
      analyser.onaudioprocess = function (e) {
        setIsRecording(true);
      };
    });
  }, []);

  useEffect(() => {
    console.log(audioUrl);
  }, [audioUrl]);

  const offRecAudio = useCallback(async () => {
    setIsRecording(false);
    if (media) {
      // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
      media.ondataavailable = async function (e) {
        await onSubmitAudioFile(e.data);
        setIsRecording(false);
      };

      // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
      stream?.getAudioTracks().forEach(function (track) {
        track.stop();
      });

      // 미디어 캡처 중지
      media.stop();

      // 메서드가 호출 된 노드 연결 해제
      analyser?.disconnect();
      source?.disconnect();
    }
  }, [media, stream, analyser, source]);

  const onSubmitAudioFile = async (audioUrl: Blob) => {
    // if (audioUrl) {
    //   const audioBlobUrl = URL.createObjectURL(audioUrl);
    //   setAudioBlobUrl(audioBlobUrl);
    //   console.log(audioBlobUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
    // }
    const reader = new FileReader();
    const sound = new Blob([audioUrl as BlobPart], { type: "audio/mpeg3" });
    console.log(sound);
    // const audioBlobUrl = URL.createObjectURL(sound);
    // setAudioBlobUrl(audioBlobUrl);

    // console.log("리더기", reader.readAsArrayBuffer(sound));
    // const aad = new Audio(sound.toString("base64"));
    reader.readAsArrayBuffer(sound);

    reader.onloadend = async () => {
      const audioContext = new AudioContext();
      const arrayBuffer = reader.result;
      const bufferedSound = await audioContext.decodeAudioData(arrayBuffer as ArrayBuffer);
      const resampled = await resample(bufferedSound, 16000);
      const reBlob = audioBufferToWav(resampled);

      // const soundString = arrayBuffer!.toString(); // File 정보 출력
      // console.log(soundString.slice(24));
      console.log(reBlob);
      // const newBase64 = arrayBuffer?.toString();
      // console.log(newBase64?.slice(18));

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
          .then(json => json.return_object.recognized)
          .then(recognized => setAudioRecognized(recognized))
          .catch(err => console.log(err));
      };
      PostAudio();
      // mutate({ url: audioBlobUrl });
    };
  };

  // const RecordBtn = () => {
  //   return (
  //     <div style={{ margin: "400px" }}>
  //       <button onClick={isRecording ? offRecAudio : onRecAudio}>녹음</button>
  //       <div>{isRecording ? "녹음중" : "대기"}</div>
  //       <button onClick={onSubmitAudioFile}>결과 확인</button>
  //       <audio controls src={audioBlobUrl} />

  //       {/* <p>Microphone: {listening ? "on" : "off"}</p>
  //       <button onClick={() => (listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening())}>
  //         {listening ? "End" : "Start"}
  //       </button>
  //       <button onClick={() => resetTranscript()}>Reset</button>
  //       <p>{transcript}</p> */}
  //     </div>
  //   );
  // };
  return { offRecAudio, onRecAudio, onSubmitAudioFile, audioRecognized, isRecording };
};

export default useAudio;
