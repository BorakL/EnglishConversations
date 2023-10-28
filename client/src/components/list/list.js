import { useEffect, useState } from "react";
import Sentence from "../sentence/sentence";
import useForm from "../../hooks/useForm";
import Button from "../button/button";
import { useOutletContext } from "react-router";
import { updateConversation } from "../../services/api";

const List = ()=>{

    const outletContext = useOutletContext()

    const c = outletContext?.conversation?.conversation || []
    const conversationContent = c.length>0 ? c : []

    const[editingFields,setEditingFields]=useState([])

    const action = async (values) => {
        if(values.isValid && Object.keys(values.inputs).length>0){
            const newConversation = conversationContent.map(c=>{
                if(values.inputs[c.eng]){
                    let input = values.inputs[c.eng];
                    return {serb:input.serb, eng:input.eng }
                }else{
                    return c
                }
            })
            try{
                await updateConversation(outletContext.conversation._id, {"conversation":newConversation})
                setEditingFields([])
            }catch(error){
                console.log("error",error)
            }
        }
    }

    const {
        inputHandler,
        submitHandler,
        removeHandler,
        formState
    } = useForm({}, action)


    const conversation = conversationContent.map(c => 
        <Sentence 
            serb={c.serb} 
            eng={c.eng} 
            id={c.eng}
            inputHandler={inputHandler}
            removeHandler={removeHandler}
            editingFields={editingFields}
            setEditingFields={setEditingFields}
        />
    )

    return(
        <>
        {editingFields.length>0 ? 
            <form onSubmit={submitHandler}>
                {conversation}
                <Button
                    type="submit"
                    disabled={!formState?.isChanged || !formState?.isValid}
                />
            </form>
            :
            conversation
        }
        </>
    )
}

export default List;