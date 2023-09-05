import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (props) => {

    if (!props.browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
          <p>Microphone: {props.listening ? 'on' : 'off'}</p>
          <button type="button" onClick={SpeechRecognition.startListening}>Start</button>
          <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
          <p>{props.transcript}</p>
        </div>
      );
}

export default Dictaphone