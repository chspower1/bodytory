import { useCallback, useState } from "react";

import customApi from "@utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { fileURLToPath } from "url";

const useAudio = () => {
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();

  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [analyser, setAnalyser] = useState<ScriptProcessorNode>();
  const [audioUrl, setAudioUrl] = useState<Blob>();
  const [audioBlobUrl, setAudioBlobUrl] = useState("");
  const [audioFile, setAudioFile] = useState<string>();
  const [isRecording, setIsRecording] = useState(false);
  const { postApi } = customApi("/api/users/records/voice");
  const { mutate } = useMutation(["voice"], postApi, {
    onSettled(data) {
      console.log("Mutated : ", data);
    },
  });

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new window.AudioContext();

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
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
      analyser.onaudioprocess = function (e) {
        setIsRecording(true);
      };
    });
  };

  const offRecAudio = () => {
    setIsRecording(false);
    if (media) {
      // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
      media.ondataavailable = function (e) {
        setAudioUrl(e.data);

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
  };

  const bufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    const len = buffer.byteLength;
    let binary = "";
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const onSubmitAudioFile = useCallback(async () => {
    if (audioUrl) {
      const audioBlobUrl = URL.createObjectURL(audioUrl);
      setAudioBlobUrl(audioBlobUrl);
      setAudioFile(audioBlobUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
      console.log("asdasdasd", await audioUrl.arrayBuffer());
    }
    const reader = new FileReader();
    console.log(audioUrl);
    const sound = new File([audioUrl as BlobPart], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    // console.log("리더기", reader.readAsArrayBuffer(sound));
    // const aad = new Audio(sound.toString("base64"));
    reader.readAsArrayBuffer(sound);

    reader.onload = async () => {
      const audioContext = new AudioContext();
      const arrayBuffer = reader.result;
      // const bufferedSound = await audioContext.decodeAudioData(arrayBuffer as ArrayBuffer);

      // console.log(arrayBuffer); // File 정보 출력
      console.log(bufferToBase64(arrayBuffer as ArrayBuffer));

      const audio = new Audio(bufferToBase64(arrayBuffer as ArrayBuffer));
      audio.load();
      console.log(audio);

      const PostAudio = async () => {
        const aa = await (
          await fetch("http://aiopen.etri.re.kr:8000/WiseASR/Recognition", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "8b10a352-acfc-483c-9816-52dbdc37181a",
            },
            body: JSON.stringify({
              request_id: "chspower1@naver.com",
              argument: {
                language_code: "korean",
                audio: bufferToBase64(arrayBuffer as ArrayBuffer),
              },
            }),
          })
        ).json();

        console.log(aa);
      };
      PostAudio();
      // mutate({ url: audioBlobUrl });
    };
  }, [audioUrl]);

  const RecordBtn = () => {
    return (
      <div style={{ margin: "400px" }}>
        <button onClick={isRecording ? offRecAudio : onRecAudio}>녹음</button>
        <div>{isRecording ? "녹음중" : "대기"}</div>
        <button onClick={onSubmitAudioFile}>결과 확인</button>
        <audio controls src={audioFile} />
      </div>
    );
  };
  return { RecordBtn, audioFile, audioBlobUrl };
};

export default useAudio;
