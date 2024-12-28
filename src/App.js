import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './componets/NavBar';
import Home from './componets/home';
import About from './componets/About';
import Login from './componets/login';
import NotesState from './context/notes/NotesState';
import Alert from './componets/Alert';
import SignUp from './componets/SignUp';
import LoadingBar from 'react-top-loading-bar';


function App() {
  const [filled, setFilled] = useState(0);
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() =>{
      setAlert(null);
    }, 2000)
  }
  const [mode, setMode] = useState('dark');
  const [btntext, setBtnText] = useState('Enable Dark Mode');
  const [myStyle, setMyStyle] = useState({
    backgroundColor: '#212529'
  })
  const [textColor, setTextColor] = useState({
    color: '#212529'
  })
  const Toggle = () => {
    if (myStyle.backgroundColor === '#212529'){
      setMyStyle({
        backgroundColor: '#fff'
      })
      setTextColor({
        color: '#212529'
      })
      document.body.style.backgroundColor = '#fff'
      setMode('dark');
      setBtnText("Enable Dark Mode")
    }
    else{
      setMyStyle({
        backgroundColor: '#212529'
      })
      setTextColor({
        color: '#fff'
      })
      setMode('light');
      setBtnText("Enable Light Mode")
    document.body.style.backgroundColor = '#212529' 
    }
}
  return (
    <>
    <NotesState>
      <Router>
      <NavBar title="String Manupilation" about="About Us" toggle={Toggle} style={myStyle} textColor={textColor} mode={mode} btntext={btntext} showAlert={showAlert}/>
      <LoadingBar  
        height={3}  
        color='#f11946' 
        progress={filled}
        onLoaderFinished = {()=>setFilled(0)}
      />
      <Alert alert= {alert}/>
        <div className="container">
      <Routes>
        {/* Use `element` prop and pass JSX directly */}
        <Route exact path="/" element={<Home btntext={btntext} mode={mode} showAlert={showAlert} setFilled={setFilled}/>} />
        <Route exact path="/about" element={<About setFilled={setFilled}/>} />
        <Route exact path="/login" element={<Login mode={mode} showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<SignUp mode={mode} showAlert={showAlert}/>} />
      </Routes>
        </div>
    </Router>
    </NotesState>
    </> 
  );  
}
   
export default App;
