import './App.scss';
import Home from './pages/home/home';
import Topics from './pages/topics/topics';
import Topic from './pages/topic/topic'; 
import { Route, Routes, useLocation } from 'react-router';  
import Conversation from './pages/conversation/conversation';
import TestConversation from './pages/test/test';
import MainNavigation from './components/navigation/mainNavigation';
import { useRef } from 'react';

function App() {
  // const dispatch = useDispatch();
  // const {
  //   initRender
  // } = useSelector(({app})=>({
  //   initRender: app.inituseScrollRestoration Render
  // }))

  // useEffect(()=>{
  //     if(initRender){
  //       dispatch({
  //         type:SET_INITIAL_RENDER,
  //         payload:false
  //       })
  //     }
  // },[]) 

  const scrollParentRef = useRef()
 
  
  return ( 
      <div className="App" ref={scrollParentRef}>
        <MainNavigation/>
        <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="topics" element={<Topics scrollParentRef={scrollParentRef}/>} />
          <Route path="topics/:id" element={<Topic/>} /> 
          <Route path="topics/:id/:conversation" element={<Conversation/>} />
          <Route path="topics/:id/:conversation/test" element={<TestConversation/>} />
        </Routes>
        </main>
      </div> 
  );
}

export default App;
