import Button from "../../button/button";
import {PiSpeakerSimpleHighBold,PiSpeakerSimpleXBold} from "react-icons/pi"

const Options = (props)=>{
    return(
        <>
        <div>   
            <Button
                type="button"
                style="buttonIcon"
                onClick={()=>{
                    props.appContext.turnAudio();
                }}
            >
                {props.appContext.globalOptions.audio ? <PiSpeakerSimpleHighBold/> : <PiSpeakerSimpleXBold/>}
            </Button>
        </div>
        <div>
            <Button 
                style="buttonText" 
                type="button"
                onClick={props.resetTest}
            >
                Restart write
            </Button>
        </div>
        </>
    )
}

export default Options