import { useContext, useEffect, useMemo, useState } from "react"; 
import "./card.scss"
import Button from "../../components/button/button";
import { useOutletContext } from "react-router";
import { useSpeechSynthesis } from "react-speech-kit";
import {FaPlay,FaStop} from "react-icons/fa"
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { AppContext } from "../../context/appContext";
import { FaRepeat } from "react-icons/fa6";

const FlashCards = ()=>{

    const outletContext = useOutletContext();
    const conversation = outletContext?.conversation?.conversation || [];
    const appContext = useContext(AppContext)

    const[pointer,setPointer]=useState(0)
    const[flip,setFlip] = useState(false)
    const[isPlayConversation,setIsPlayConversation] = useState(false)
    const[endSpeak,setEndSpeak] = useState(false)
    
    const { speak } = useSpeechSynthesis({
        onEnd: ()=>{
            setPointer(prev => prev===conversation.length-1 ? 0 : prev+1)
            setEndSpeak(true)
        }
    }); 
 
    const flipCard = ()=>{
        if(!isPlayConversation){
            setFlip(prev=>!prev)
        }
    }

    const playConversation = ()=>{
        if(!isPlayConversation){
            setIsPlayConversation(true);
            setFlip(true)
        }else{
            setIsPlayConversation(false);
            setFlip(false)
        }
        setPointer(0)
    }

    useMemo(()=>{
        if(conversation[pointer] && isPlayConversation){ 
            setEndSpeak(false)
            return speak({text:conversation[pointer]?.eng})
        }
        else if(pointer===conversation.length ){ 
            setPointer(0)
            setFlip(false)
            setIsPlayConversation(false)
        }
    },[pointer,conversation.length,isPlayConversation])

    useEffect(()=>{
        if(endSpeak && !isPlayConversation){
            setPointer(prev=>prev-1)
        }
    },[isPlayConversation,endSpeak])

    const card = (conversation)=> <div className={`flip-card ${flip ? " flip-active" : ""}`} >
                                        <div className = "flip-card-inner" onClick={flipCard}>
                                            <div className="flip-card-front">
                                                <p>{appContext.globalOptions.isEnglishFirst ? conversation?.eng : conversation?.serb}</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <p>{appContext.globalOptions.isEnglishFirst ? conversation?.serb : conversation?.eng}</p>
                                            </div>
                                        </div>
                                    </div> 

    return( 
        <div className="flash-card">
            {!isPlayConversation ?
                <Swiper
                    pagination={{
                        type: 'bullets',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]} 
                    onSlideChange={()=>setFlip(false)}
                    >
                        {conversation.map(c=><SwiperSlide key={c._id}>{card(c)}</SwiperSlide>)}
                </Swiper>
            : 
            <> 
                <div>
                    {card(conversation[pointer])}
                </div>
                <div>
                    {`${pointer+1}/${conversation.length}`}
                </div> 
            </> 
            }
            <div className="flash-card-controllers"> 
                <div>
                    <Button
                        onClick={playConversation}
                        icon
                    >
                        {!isPlayConversation ? <FaPlay/> : <FaStop/>}
                    </Button>
                </div>
                {!isPlayConversation ?
                <div>
                    <Button
                        onClick={()=>{if(!isPlayConversation)appContext.changeFirstLang()}}
                        icon
                    >
                        <FaRepeat/>
                    </Button>
                </div>
                : null
                }
                
            </div>
        </div> 
    )
}

export default FlashCards;