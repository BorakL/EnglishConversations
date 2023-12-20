import { useMemo, useState } from "react";
import Button from "../../components/button/button";
import Sentence from "../../components/sentence/sentence";
import useForm from "../../hooks/useForm"
import { createConversation } from "../../services/api";

const CreateConversation = ()=>{
    const[newStudySet,setNewStudySet]=useState([]);
    const[loading,setLoading]=useState(false)

    const addCardHandler = ()=>{
        const id = Math.floor(Math.random()*1000);
        setNewStudySet(prev=>[...prev, id])
    }
    
    const removeCardHandler = (id)=>{
        let updatedStudySet = newStudySet.filter(s => id!==id)
        setNewStudySet(updatedStudySet)
        removeHandler([`${id}-eng`,`${id}-serb`])
    }

    const createStudySet = async(values)=>{
        if(values.isValid && Object.keys(values.inputs).length>0){
            setLoading(true)
            const data = newStudySet.map(c => {
                if(values.inputs[`${c}-eng`] && values.inputs[`${c}-serb`]){
                    let inputEng = values.inputs[`${c}-eng`];
                    let inputSerb = values.inputs[`${c}-serb`];
                    return {serb:inputSerb.value, eng:inputEng.value}
                }else{
                    return c
                }
            })
            try{
                await createConversation(data)
                setLoading(false)
            }catch(error){
                setLoading(false)
                console.log("error",error)
            }
        }
    }

    useMemo(()=>{
        addCardHandler()
    },[])
    
    const{
        formState,
        inputHandler,
        removeHandler,
        submitHandler
    } = useForm({},createStudySet)

    return(
        <div className="create-conversation-page page-wrapper">
            <div className="create-conversation-page-title">
                <h1>Create Study Set</h1>
            </div>
            <div className="create-conversation-page-form">
                <form onSubmit={submitHandler}>
                    {newStudySet.map(c=>
                        <Sentence
                            key={c}
                            id={c}
                            serb=""
                            eng=""
                            inputFormHandler={inputHandler}
                            removeSentenceHandler={removeCardHandler}
                            isEditing={true}
                        />
                    )}   
                    <Button
                        type="submit"
                        disabled={!formState.isValid}
                    >
                        Create
                    </Button>   
                    <Button
                        type="button"
                        onClick={addCardHandler}
                    >
                        Add Card    
                    </Button>  
                    {loading ? <h1>Loading...</h1> : null}
                </form>
            </div>
        </div>
    )
}

export default CreateConversation