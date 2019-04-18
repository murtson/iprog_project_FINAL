import React, { Component } from "react";
import "./login.css";
import face from "../images//people.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className="bg">
        <h1 style={{ color: "#fff" }}>
          This is the login page, for now just click the "login button" to
          continue.
        </h1>

        <div className="modal-dialog text-center">
          <div className="col-sm-8 main-section">
            <div className="modal-content" id="modal-content">
              <div className="col-12 user-img">
                <img src={face} alt="" />
              </div>

              <form className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <Link to="/home">
                  <button type="submit" className="btn" id="btn">
                    <FontAwesomeIcon
                      icon="sign-in-alt"
                      style={{ fontSize: "20px", marginRight: "7px" }}
                    />
                    Login
                  </button>
                </Link>

                <div className="col-12 forgot">
                  <a href="#testlink">Forgot Password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
