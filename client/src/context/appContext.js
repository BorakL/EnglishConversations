import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => { 
    const defaultOptions = {
        audio: true
    }

    const[globalOptions,setGlobalOptions]=useState(defaultOptions)

    const turnAudio = ()=>{
        setGlobalOptions(prev=>{return {...prev, audio: !globalOptions.audio}})
    }

    return(
        <AppContext.Provider value={{globalOptions, turnAudio}}> 
            {children}            
        </AppContext.Provider>
    )
}

export {AppContext,AppContextProvider}