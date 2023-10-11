import { createContext, useRef } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => { 
    const data = {}
    return(
        <AppContext.Provider value={data}> 
            {children}            
        </AppContext.Provider>
    )
}

export {AppContext,AppContextProvider}