import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [crediential, setcrediential] = useState({name:"",email: "", password: "",cpassword:""});
  let navigate= useNavigate();

  const SignupHandler = async (e) => {
    e.preventDefault();
    if(crediential.password !== crediential.cpassword){
      props.showAlert("danger","Invalid Data", "Password not match")
return;
    }

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: crediential.name,
        email: crediential.email,
        password: crediential.password,
      }),
    });
    const json= await response.json();
    if(json.success){
      // localStorage.setItem('token',json.authtoken)
props.handleButtonClick();
      props.showAlert("success","Sign Up Success", "You are Sign UP Successfully")

    }else{
      props.showAlert("danger","Sign UP Failed", json.error)

    }

    
  };
  const changeHandler = (e) => {
    setcrediential({...crediential,[e.target.name]:e.target.value})
    // console.log(crediential.email,crediential.password)
  };
  

  return (
   <div className="p-4 py-2">
     <div className="">
            <h2 className="my-3 text-center">SignUp In to QuickNotes</h2>

      <form onSubmit={SignupHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={changeHandler}
            required
           minLength={3}
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={changeHandler}
            required
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={changeHandler}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={changeHandler}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary bg-color">
          SignUp
        </button>
      </form>
    </div>
   </div>
  );
};

export default Signup;
