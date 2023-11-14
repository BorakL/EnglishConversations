import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => { 
    const defaultOptions = {
        audio: true,
        isEnglishFirst: true
    }

    const[globalOptions,setGlobalOptions]=useState(defaultOptions)

    const turnAudio = ()=>{
        setGlobalOptions(prev=>{return {...prev, audio: !globalOptions.audio}})
    }
    const changeFirstLang = ()=>{
        setGlobalOptions(prev=>{return {...prev, isEnglishFirst: !globalOptions.isEnglishFirst}})
    }

    return(
        <AppContext.Provider value={{
            globalOptions, 
            turnAudio,
            changeFirstLang
        }}> 
            {children}            
        </AppContext.Provider>
    )
}

export {AppContext,AppContextProvider}