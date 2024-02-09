import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Form from './screens/Form';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/test' element={<Form/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
