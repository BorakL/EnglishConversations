import { useSpeechSynthesis } from "react-speech-kit";
import "./sentence.scss"
import Button from "../button/button";
import { useEffect, useState } from "react";
import Input from "../input/input";
import { VALIDATOR_REQUIRE } from "../../utils/valid";
import {RxSpeakerLoud} from 'react-icons/rx';
import {FiEdit2} from 'react-icons/fi';

const Sentence = (props)=>{ 
    const[isReading,setIsReading] = useState(false) 
    
    const { speak } = useSpeechSynthesis({
        onEnd: ()=>{setIsReading(false)}
    });
    let indx = props.editingFields?.findIndex(f=>f===props.id)

    const editHandler = ()=>{
        if(indx<0){
            props.setEditingFields(prev=>{return[...prev,props.id]})
        }else{
            const prevFields = [...props.editingFields];
            prevFields.splice(indx,1)
            props.setEditingFields(prevFields)
            props.removeHandler(props.id)
        }
    }

    const soundHandler = ()=>{
        setIsReading(true)
        speak({ text: props.eng })
    } 
    
    return(
        <div className="sentence">
            <div className="sentenceContent">  
                {
                    indx>=0 ?
                    <>
                        <div>
                            <Input
                                id={props.id}
                                type="textarea"
                                onInput={props.inputHandler}
                                initValue={props.serb}
                                name="serb"
                                placeholder={props.serb}
                                errorMessage="serbian error"
                                validators = {[VALIDATOR_REQUIRE()]}
                                class="inputDefault"
                            />
                        </div>
                        <div>
                            <Input
                                id={props.id}
                                type="textarea"
                                onInput={props.inputHandler}
                                initValue={props.eng}
                                name="eng"
                                placeholder={props.eng}
                                errorMessage="english error"
                                validators = {[VALIDATOR_REQUIRE()]}
                                class="inputDefault"
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
                    onClick={soundHandler}
                    type="button"
                    style={`buttonIcon ${isReading && "buttonIconActive"}`}
                >
                    <RxSpeakerLoud/>
                </Button>
                {
                    props.editingFields ? 
                    <Button
                        onClick={editHandler}
                        type="button"
                        style={`buttonIcon ${indx>=0 && "buttonIconActive"}`}
                    >
                        <FiEdit2/>
                    </Button>
                    : null
                }
                
            </div> 
        </div>
    )
}

export default Sentence;