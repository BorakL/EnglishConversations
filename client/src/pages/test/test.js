import { useParams } from "react-router";
import { getConversation } from "../../services/api"; 
import { useEffect, useState } from "react"; 
import Task from "../../components/task/task";
import { useDispatch, useSelector } from "react-redux";
import { SET_SINGLE_CONVERSATION } from "../../reducers/conversations";


const TestConversation = () => {

    const {
        singleConversation        
    } = useSelector( ({conversations}) => ({
        singleConversation: conversations.singleConversation
    }))

    const[pointer,setPointer] = useState(0)
    const[roundQuestions, setRoundQuestions] = useState([])
    const[round,setRound] = useState(1)
    const[initLoad,setInitLoad] = useState(false)
    const[currentQuestion,setCurrentQuestion] = useState({})

    const params = useParams();
    const dispatch = useDispatch();

    const loadConversation = async (conversationId) => {
        const covnersationData = await getConversation(conversationId)
        dispatch({
            type: SET_SINGLE_CONVERSATION,
            payload: covnersationData.data.doc
        })
        setInitLoad(true)
    }

    useEffect(()=>{
        loadConversation(params.conversation);
    },[])

    useEffect(()=>{
        setRoundQuestions(singleConversation.results ? singleConversation.results.filter(q=>q.correctRound===0) : []) 
    },[round,initLoad])

    useEffect(()=>{ 
        if(roundQuestions.length){
            setCurrentQuestion(singleConversation.results?.find(r=>r._id===roundQuestions[pointer]._id))
        }
    },[singleConversation.results])

    const nextQuestion = ()=>{ 
        setPointer(prev => (prev+1)%roundQuestions.length )
    }

    return (
        <>
        <h1>Round {round}</h1>
        {
           singleConversation && singleConversation.results && singleConversation.results.length ? 
            <div>
                <Task 
                    {...roundQuestions[pointer]} 
                    results={singleConversation.results} 
                    currentQuestion={currentQuestion}
                    nextQuestion={nextQuestion} 
                    roundQuestionsCount={roundQuestions.length}
                    pointer={pointer}
                    round={round}
                    setRound={setRound}
                />
            </div> :
            <p>...loading</p>
        }
        </>
    )
}

export default TestConversation;