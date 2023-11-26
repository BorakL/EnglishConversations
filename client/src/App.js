import './App.scss';
import Home from './pages/home/home';
import Topics from './pages/topics/topics';
import Topic from './pages/topic/topic'; 
import { Route, Routes, useLocation } from 'react-router';  
import Conversation from './pages/conversation/conversation';
import TestConversation from './pages/test/test';
import MainNavigation from './components/navigation/mainNavigation';
import { useMemo, useRef } from 'react'; 
import Card from './components/card/card';
import List from './components/list/list';
import {useNavigationType} from 'react-router-dom';
import { AppContextProvider } from './context/appContext';
import EditConversation from './pages/editConversation/editConversation';
import Login from './pages/login/login'; 
import {AuthContextProvider} from './context/authContext'
import PageNotFound from './pages/PageNotFound/pageNotFound';
import Signup from './pages/signup/signup';

function App() {

  const scrollParentRef = useRef()

  const location = useLocation();
  const navigationType = useNavigationType();
  
  const getRoutes = (l)=> <Routes location={l}>
                  <Route path="/" element={<Home/>} />
                  <Route path="topics" element={<Topics scrollParentRef={scrollParentRef}/>} />
                  <Route path="topics/:id" element={<Topic/>} /> 
                  <Route path="topics/:id/:conversation" exact={false} element={<Conversation/>} >
                    <Route path="learn" exact element={<Card/>}/>
                    <Route path="list" exact element={<List/>}/>
                    <Route path="test" exact element={<TestConversation/>}/>
                    <Route path="edit" exact element={<EditConversation/>}/>
                  </Route> 
                  <Route path="login" element={<Login/>}/>
                  <Route path="signup" element={<Signup/>}/>
                  <Route path="*" element={<PageNotFound/>}/>
                </Routes>

  const backgroundLocation = useMemo(()=>{
    if(location.state && location.state.backgroundLocation && navigationType!=="POP")
      return location.state.backgroundLocation
    return null
  },[location])

  return ( 
    <AuthContextProvider>
      <AppContextProvider>
        <div className="App">
          <MainNavigation/>
          <div
            className={`layout ${backgroundLocation ? "hidden" : "visible"}`} 
            ref={scrollParentRef}
          > 
            <main>
              {getRoutes(backgroundLocation || location) }
            </main>         
          </div> 
          <main>
            { backgroundLocation && getRoutes(location) }
          </main>
        </div>
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default App;
