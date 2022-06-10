import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home.jsx'
import Todos from './Pages/Todos/Todos';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/todos" element={<Todos/>}/>
  </Routes>
  );
}

export default App;
