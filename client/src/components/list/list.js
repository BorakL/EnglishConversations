import Sentence from "../sentence/sentence";

const List = (props)=>{

    return(
        <>
            {props.conversation.map(c => 
                <Sentence serb={c.serb} eng={c.eng}/> 
            )}
        </>
    )
}

export default List;