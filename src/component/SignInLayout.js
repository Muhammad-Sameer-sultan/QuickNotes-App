import React, { useContext, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import noteContext from "./Context/notes/noteContext";

const SignInLayout = () => {

    const{showAlert}=useContext(noteContext)
  const [isSignInActive, setSignInActive] = useState(true);
  const [btnActive, setbtnActive] = useState("");

  const handleButtonClick = (e) => {
      console.log("ss",e.target.name)
if(e.target.name !== btnActive)
setSignInActive((prev) => !prev);
setbtnActive(e.target.name)
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
    <div className="border border-2 d-inline-block">
      <div
        className="d-flex justify-content-center align-items-center gap-2"
        style={{ marginTop: "-1rem" }}
      >
          <button
            className={`btn ${isSignInActive ? "bg-color" : "bg-color-light"}`}
            onClick={handleButtonClick}
            name="signin"
          >
            Sign In
          </button>
          <button
            className={`btn ${!isSignInActive ? "bg-color" : "bg-color-light"}`}
            onClick={handleButtonClick}
            name="signup"

          >
            Sign Up
          </button>
        </div>
        {
            isSignInActive?
            <Login showAlert={showAlert}/>: <Signup/>
        }
      </div>
    </div>
  );
};

export default SignInLayout;
