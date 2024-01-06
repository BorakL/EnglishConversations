import { useSpeechSynthesis } from "react-speech-kit";
import "./sentence.scss"
import Button from "../button/button";
import { useState } from "react";
import Input from "../input/input";
import { VALIDATOR_REQUIRE } from "../../utils/valid";
import {RxSpeakerLoud} from 'react-icons/rx';
import {FiEdit2} from 'react-icons/fi';
import { GoTrash } from "react-icons/go"; 

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
                                isRequired={true}
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
                                isRequired={true}
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
                {
                    props.soundButton ? 
                    <Button
                        onClick={soundHandler}
                        type="button"
                        icon
                        active={isReading}
                        disabled = {!props.serb || !props.eng}
                    >
                        <RxSpeakerLoud/>
                    </Button>    
                    :
                    null
                }
                {
                    props.editingFields && !props.isEditing ?
                    <Button
                        onClick={editHandler}
                        icon
                        type="button"
                        active={indx>=0}
                    >
                        <FiEdit2/>
                    </Button>
                    : null
                }
                {
                    props.removeSentenceHandler ?
                    <Button 
                        onClick={()=>props.removeSentenceHandler(props.id)}
                        icon
                        type="button" 
                    >
                        <GoTrash/>
                    </Button>
                    : null
                } 
                
            </div> 
        </div>
    )
}

export default Sentence;