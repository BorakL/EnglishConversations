import logo from './logo.svg';
import './App.css';
import Home from './pages/home/home';
import Topics from './pages/topics/topics';
import Topic from './pages/topic/topic';
import Learn from './pages/learn/learn';
import Test from './pages/test/test';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="topics" element={<Topics/>} />
        <Route path="topics/:id" element={<Topic/>} />
        <Route path="topics/:id/test" element={<Test/>} />
        <Route path="topics/:id/learn" element={<Learn/>} />
      </Routes>
    </div>
  );
}

export default App;
