import { useEffect, useMemo, useState } from "react";
import Button from "../../components/button/button";
import Sentence from "../../components/sentence/sentence";
import useForm from "../../hooks/useForm"
import { createConversation, getTopics } from "../../services/api";
import { v4 as uuidv4 } from 'uuid';
import Loader from "../../components/loader/loader";
import Input from "../../components/input/input";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOPICS } from "../../reducers/topics";
import "./createConversation.scss"

const CreateConversation = ()=>{
    const[newStudySet,setNewStudySet]=useState([]);
    const[loading,setLoading]=useState(false)
    const[topic,setTopic]=useState(null)
    const dispatch = useDispatch()
    const{topics} = useSelector(({topics}) => ({
        topics: topics.topics
    })) 

    const addCardHandler = ()=>{ 
        setNewStudySet(prev=>[...prev, uuidv4()])
    }
    
    const removeCardHandler = (id)=>{
        let updatedStudySet = newStudySet.filter(s => s!==id)
        setNewStudySet(updatedStudySet)
        removeHandler([`${id}-eng`,`${id}-serb`])
    }

    const loadTopics = async()=>{
        try{
            setLoading(true)
            const topicsData = await getTopics()
            dispatch({
                type: SET_TOPICS,
                payload: {
                    data: topicsData.data.data
                }
            })
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.log("error",error)
        }
    }

    const createStudySet = async(values)=>{
        if(values.isValid && Object.keys(values.inputs).length>0 && topic && values.inputs["title"]){
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
            const title = values.inputs["title"].value
            try{
                await createConversation({conversation:data,title,topic})
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

    useEffect(()=>{
        loadTopics()
    },[])

    return(
        <div className="create-conversation-page page-wrapper">
            <div className="create-conversation-header">
                <div className="create-conversation-header-title header-title left-title">
                    <h1>Create Study Set</h1>
                </div>
            </div>
            <div className="create-conversation-form">
                <form onSubmit={submitHandler}>
                    <div className="create-conversation-form-details">
                        <div className="create-conversation-form-details-name">
                            <Input onInput={inputHandler} type="text" id="title" name="title" placeholder="Title"/>
                        </div>
                        <div className="create-conversation-form-details-topic">
                            
                            <select onChange={(e)=>setTopic(e.target.value)} name="topic" id="topic">
                                {topics.map(topic => <option value={topic._id} >{topic.title}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="conversation-wrapper-content">
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
                    </div> 
                    <div className="">
                        <Button
                            type="button"
                            onClick={addCardHandler}
                        >
                            Add Card    
                        </Button>
                    </div>
                    <div className="right-button">
                        <Button
                            type="submit"
                            disabled={!formState.isValid}
                        >
                            Create
                        </Button>
                    </div>
                    
                </form>
                {loading ? <Loader/> : null}
            </div>
        </div>
    )
}

export default CreateConversation