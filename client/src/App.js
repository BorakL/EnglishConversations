import './App.scss';
import Home from './pages/home/home';
import Topics from './pages/topics/topics';
import Topic from './pages/topic/topic'; 
import { Route, Routes, useLocation } from 'react-router';  
import Conversation from './pages/conversation/conversation';
import MainNavigation from './components/navigation/mainNavigation';
import { useMemo, useRef } from 'react'; 
import Terms from './pages/terms/terms';
import {useNavigationType} from 'react-router-dom';
import { AppContextProvider } from './context/appContext';
import EditConversation from './pages/editConversation/editConversation';
import Login from './pages/login/login'; 
import {AuthContextProvider} from './context/authContext'
import PageNotFound from './pages/PageNotFound/pageNotFound';
import Signup from './pages/signup/signup';
import CreateConversation from './pages/createConversation/createConversation';
import Practice from './pages/practice/practice';
import FlashCards from './pages/card/card';
import UserProfile from './pages/userProfile/userProfile';
import Footer from './components/footer/footer';

function App() {
  const scrollParentRef = useRef()

  const location = useLocation();
  const navigationType = useNavigationType();
  
  const getRoutes = (l)=> <Routes location={l}>
                  <Route path="/" element={<Home/>} />
                  <Route path="topics" element={<Topics scrollParentRef={scrollParentRef}/>} />
                  <Route path="topics/:id" element={<Topic/>} /> 
                  <Route path="conversations/:conversation" exact={false} element={<Conversation/>} >
                    <Route path="flashcards" exact element={<FlashCards/>}/>
                    <Route path="terms" exact element={<Terms/>}/>
                    <Route path="practice" exact element={<Practice/>}/>
                    <Route path="terms/edit" exact element={<EditConversation/>}/>
                  </Route> 
                  <Route path="login" element={<Login/>}/>
                  <Route path="signup" element={<Signup/>}/>
                  <Route path="create-conversation" element={<CreateConversation/>}/>
                  <Route path="user-profile" element={<UserProfile/>}/>
                  <Route path="*" element={<PageNotFound/>}/>
                </Routes>

  const backgroundLocation = useMemo(()=>{
    if(location.state && location.state.backgroundLocation && navigationType!=="POP"){
      return location.state.backgroundLocation
    }
    return null
  },[location])

  const getLayout = (location)=>{
    return(<>
      <MainNavigation/> 
        <main>
          {getRoutes(location) }
        </main>  
      <Footer/>       
    </>)
  }

  return ( 
    <AuthContextProvider>
      <AppContextProvider>
      <>
        <div className={`layout ${backgroundLocation ? "hidden" : "visible"}`} ref={scrollParentRef}>
          {getLayout(backgroundLocation || location)}
        </div> 
        {backgroundLocation && getLayout(location)} 
      </>
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default App;
