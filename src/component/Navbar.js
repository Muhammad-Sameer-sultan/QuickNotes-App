import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import taskIcon from '../assets/task-icon.png'
const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (localStorage.getItem("token")) {
          const response = await fetch(
            "http://localhost:5000/api/auth/getuser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          const json = await response.json();
          setUser(json.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [localStorage.getItem("token")]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">

        <Link className="navbar-brand " href="/">
          <div className="d-inline-block me-2" style={{width:"1.7rem"}}>

      <img src={taskIcon}  alt="task icon" className="img-fluid"/>
          </div>
          QuickNotes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            
              
              { user && (
                <div className="d-flex jusify-content-center align-item-center ">
                  <div className="btn btn-primary mx-1  bg-color">
                    <i className="fas fa-user me-2"></i>
                    <span>{user.email}</span>
                  </div>
                  <button
                    onClick={logoutHandler}
                    className="btn btn-primary mx-1  bg-color"
                  >
                    Logout
                  </button>
                </div>
              )
              }
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
