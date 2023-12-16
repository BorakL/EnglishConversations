import {HiOutlineMicrophone} from "react-icons/hi"
import Button from "../button/button";


const Dictaphone = (props) => {

    if (!props.browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleMicrophone = ()=>{
      props.setIsMicrophoneTurn(prev=>!prev)
    } 

    return (
        <div className="dictaphone">
          <Button
            onClick={handleMicrophone}
            icon
            active={props.isMicrophoneTurn}
          >
            <HiOutlineMicrophone/>
          </Button>
          <p>{props.transcript}</p>
        </div>
      );
}

export default Dictaphone