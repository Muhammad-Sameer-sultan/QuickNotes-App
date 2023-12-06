import React, { useContext, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import noteContext from "./Context/notes/noteContext";

const SignInLayout = () => {

    const{showAlert}=useContext(noteContext)
  const [isSignInActive, setSignInActive] = useState(true);

  const handleButtonClick = (e) => {
setSignInActive((prev) => !prev);
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
            <Login showAlert={showAlert} handleButtonClick={handleButtonClick}/>: <Signup handleButtonClick={handleButtonClick} showAlert={showAlert}/>
        }
      </div>
    </div>
  );
};

export default SignInLayout;
