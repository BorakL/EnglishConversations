import './App.css';
import Home from './pages/home/home';
import Topics from './pages/topics/topics';
import Topic from './pages/topic/topic'; 
import { Route, Routes } from 'react-router';  
import Conversation from './pages/conversation/conversation';
import TestConversation from './pages/test/test';
import MainNavigation from './components/navigation/mainNavigation';

function App() {
  return (
    <div className="App">
      <MainNavigation/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="topics" element={<Topics/>} />
        <Route path="topics/:id" element={<Topic/>} /> 
        <Route path="topics/:id/:conversation" element={<Conversation/>} />
        <Route path="topics/:id/:conversation/test" element={<TestConversation/>} />
      </Routes>
    </div>
  );
}

export default App;
