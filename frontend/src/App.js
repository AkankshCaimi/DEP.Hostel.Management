import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
