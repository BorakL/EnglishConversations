import { useEffect, useState } from "react";
import Sentence from "../sentence/sentence";
import useForm from "../../hooks/useForm";
import Button from "../button/button";
import { useOutletContext } from "react-router";

const List = ()=>{

    const outletContext = useOutletContext()

    const {
        inputHandler,
        submitHandler,
        removeHandler
    } = useForm({},()=>{console.log("action")})

    const[editingFields,setEditingFields]=useState([])

    // const isForm = Object.keys(formState.inputs).length>0;

    const conversation = outletContext.conversation.conversation.map(c => 
        <Sentence 
            serb={c.serb} 
            eng={c.eng} 
            id={c._id}
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
                />
            </form>
            :
            conversation
        }
        </>
    )
}

export default List;