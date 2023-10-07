import { useEffect, useState } from "react";
import Sentence from "../sentence/sentence";
import useForm from "../../hooks/useForm";
import Button from "../button/button";

const List = (props)=>{

    const {
        formState,
        inputHandler,
        submitHandler,
        removeHandler
    } = useForm({},()=>{console.log("action")})

    const[editingFields,setEditingFields]=useState([])

    // const isForm = Object.keys(formState.inputs).length>0;

    const conversation = props.conversation.map(c => 
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

    console.log("formState", formState)

    // useEffect(()=>{
    //     if(Object.keys(formState.inputs).length){
    //         setIsEditing(true)
    //     }else{
    //         setIsEditing(false)
    //     }
    //     console.log("formstate",formState)
    // },[formState.inputs])
    

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