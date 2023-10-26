import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  const [crediential, setcrediential] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: crediential.email,
        password: crediential.password,
      }),
    });
    const json = await response.json();
    console.log("mulogin",json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("success", "Login Success", "You are login Successfully");
    } else {
      props.showAlert("danger", "Login Failed", "Invalid Email or Password");
    }
  };
  const changeHandler = (e) => {
    setcrediential({ ...crediential, [e.target.name]: e.target.value });
    // console.log(crediential.email,crediential.password)
  };

  return (
    <div className="">
      <h2 className="my-3">Log In to QuickNotes</h2>
      <form onSubmit={loginHandler}>
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
            value={crediential.email}
            onChange={changeHandler}
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
            value={crediential.password}
            onChange={changeHandler}
          />
           <Link to="/signup">
          <small>
            if don't have an account{" "}
            Signup Now
          </small>
        </Link>
        </div>
       

        <button type="submit" className="btn btn-primary">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
