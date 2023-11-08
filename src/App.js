
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import NoteState from './Context/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import React, { useState } from "react";
import AboutApp from './Components/AboutApp';



function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/Home" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            <Route exact path="/AboutApp" element={<AboutApp/>} />
            <Route exact path="/" element={<AboutApp/>} />
          </Routes>

        </Router>
      </NoteState>
    </>
  );
}

export default App;
