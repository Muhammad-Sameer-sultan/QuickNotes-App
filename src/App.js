import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import About from "./component/About";
import Login from './component/Login'
import Signup from './component/Signup'
import NotesState from "./component/Context/notes/NotesState";
import Alert from "./component/Alert";
import NotFound from "./component/NotFound";

function App() {
  const [alert, setalert] = useState(null)
 
  

  const showAlert = (color, type, message) => {
    setalert({
      color: color,
      type: type,
      message: message
    });
    setTimeout(() => {
        setalert(null);
      }, 2000);
    };
    
    
    return (
    <NotesState>
      <Router>
        <Navbar />
        <div style={{height:"2.5rem"}}>
        {alert && <Alert alert={alert}/>}

        </div>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </Router>
    </NotesState>
  );
}

export default App;
