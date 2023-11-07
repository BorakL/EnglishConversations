import { useOutletContext } from "react-router";
import useForm from "../../hooks/useForm"
import { useEffect, useState } from "react";
import Sentence from "../../components/sentence/sentence";
import Button from "../../components/button/button";

const EditConversation = ()=>{
    const outletContext = useOutletContext().conversation?.conversation || []
    const[conversationContent,setConversationContent] = useState(outletContext);
    console.log("conversationContent",conversationContent)
    // useEffect(()=>{
    //     const c = outletContext?.conversation?.conversation || []
    //     setConversationContent(c.length>0 ? c : []);
    // },[outletContext])


    const action = (value)=>{
        console.log("formState",value)
    }

    //Ovde nemoj da koristiš map metod jer on vraća niz. Moraš da napraviš objekat
    // const inputs = conversationContent.map(c=>{
    //     return {
    //         [c._id]:{serb:c.serb, eng:c.eng}
    //     }
    // })
    // console.log("inputs",inputs)

    // const inputs = {n:4}
    // conversationContent.forEach(c=>inputs[c._id]={serb:c.serb, eng:c.eng})

    // {serb:c.serb, eng:c.eng}
    // [v.serb]:{name:'eng',value:v.eng,isValid:true,isChanged:false} 
    // const inputs = conversationContent.map(v => 
        
        // { return { [v.serb]:{name:'eng', value:v.eng, isValid:true, isChanged:false}  }
        // [v.eng]:{name:'serb',value:v.serb,isValid:true,isChanged:false}  
    
    // )

    const{
        formState, 
        inputHandler,
        removeHandler,
        addHandler,
        submitHandler
    } = useForm({},action)

    const removeSentenceHandler = (translateId,sentenceIds)=>{
        setConversationContent(prev=>prev.filter(p=>p._id!==translateId)) 
        removeHandler(sentenceIds)
    }

    const addSentenceHandler = ()=>{
        const id=Math.random()*1000
        setConversationContent(prev=>[...prev,{serb:"", eng:"", _id:id, isValid:false, isChanged:false}])
    }

    
    return(
        <>
            <form className="conversationWrapper" onSubmit={submitHandler}>
                {conversationContent.map(c=>
                    <Sentence
                        key={c._id}
                        serb={c.serb}
                        eng={c.eng}
                        id={c._id}
                        inputFormHandler={inputHandler}
                        isEditing={true}
                        removeSentenceHandler={removeSentenceHandler}
                    />
                )}
                <Button
                    type="button"
                    onClick={addSentenceHandler}
                >
                    Add Item
                </Button>
                <Button 
                    type="submit"
                    disabled={!formState.isValid}
                >
                    Done
                </Button>
            </form>    
        </>
    )
}

export default EditConversation