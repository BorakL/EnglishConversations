import { useSpeechSynthesis } from "react-speech-kit";
import "./sentence.scss"
import Button from "../button/button";
import { useState } from "react";
import Input from "../input/input";

const Sentence = (props)=>{
    const[isEditing,setIsEditing] = useState(false)
    const { speak } = useSpeechSynthesis();
    

    return(
        <div className="sentence">
            <div className="sentenceContent">  
                {
                    isEditing ?
                    <>
                        <div>
                            <Input
                                id="serb"
                                type="textarea"
                                onInput={()=>console.log("changed serb")}
                                name="serb"
                                placeholder={props.serb}
                            />
                        </div>
                        <div>
                            <Input
                                id="eng"
                                type="textarea"
                                onInput={()=>console.log("changed eng")}
                                name="eng"
                                placeholder={props.eng}
                            />
                        </div>
                    </>
                    :
                    <>
                    <div>{props.serb}</div>
                    <div>{props.eng}</div>
                    </>
                }
            </div>
            <div className="sentenceTools">
                <Button
                    onClick={()=>speak({ text: props.eng })}
                >
                    Sound
                </Button>
                <Button
                    onClick={()=>setIsEditing(prev=>!prev)}
                >
                    Edit
                </Button>
            </div> 
        </div>
    )
}

export default Sentence;