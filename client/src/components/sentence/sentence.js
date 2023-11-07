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
            props.removeFormHandler([props.id])
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
                    props.isEditing || props.editingFields && indx>=0 ?
                    <>
                        <div>
                            <Input
                                id={`${props.id}-serb`}
                                type="textarea"
                                onInput={props.inputFormHandler}
                                initValue={props.serb}
                                name={props.id}
                                title="serb"
                                placeholder={props.serb}
                                validators = {[VALIDATOR_REQUIRE()]}
                                class="inputDefault"
                                errorMessage="Problem"
                            />
                        </div>
                        <div>
                            <Input
                                id={`${props.id}-eng`}
                                type="textarea"
                                onInput={props.inputFormHandler}
                                initValue={props.eng}
                                name={props.id}
                                title="eng"
                                placeholder={props.eng}
                                validators = {[VALIDATOR_REQUIRE()]}
                                class="inputDefault"
                                errorMessage="Problem"
                                autoFocus = {true}
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
                    !props.isEditing ?
                    <Button
                        onClick={editHandler}
                        type="button"
                        style={`buttonIcon ${indx>=0 && "buttonIconActive"}`}
                    >
                        <FiEdit2/>
                    </Button>
                    : null
                }
                {
                    props.removeSentenceHandler ?
                    <Button 
                        onClick={()=>props.removeSentenceHandler(props.id,[`${props.id}-serb`,`${props.id}-eng`])}
                        type="button"
                    >
                        X
                    </Button>
                    : null
                } 
                
            </div> 
        </div>
    )
}

export default Sentence;