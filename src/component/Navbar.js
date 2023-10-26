import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  console.log(user);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
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
            {!localStorage.getItem("token") ? (
              <div>
              { location.pathname==="/signup" ? (<Link 

                  to={"/login"}
                  className="btn btn-primary mx-1 "
                  role="button"
                >
                  LogIn
                </Link>):(
                <Link
                  to={"/signup"}
                  className="btn btn-primary mx-1 "
                  role="button"
                >
                  Sign Up
                </Link>)}
              </div>
            ) : (
              user && (
                <div className="d-flex jusify-content-center align-item-center ">
                  <div className="btn btn-primary mx-1 my-3">
                    <i className="fas fa-user me-2"></i>
                    <span>{user.email}</span>
                  </div>
                  <button
                    onClick={logoutHandler}
                    className="btn btn-primary mx-1 my-3"
                  >
                    Logout
                  </button>
                </div>
              )
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
