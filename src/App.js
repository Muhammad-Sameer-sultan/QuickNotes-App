import React, {useContext, useState} from "react";
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
import SignInLayout from "./component/SignInLayout";
import noteContext from "./component/Context/notes/noteContext";

function App() {

  const {showAlert,alert}=useContext(noteContext)

    
    
    return (
    <>
      <Router>
        <Navbar />
        <div style={{height:"2.5rem"}}>
        {alert && <Alert alert={alert}/>}

        </div>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignInLayout />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
