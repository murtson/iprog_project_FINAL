import React, { Component } from "react";
import "../../components/login.css";
import face from "../../images/people.png";
import "../login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firtName: "",
    lastName: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { auth, authError } = this.props;

    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="modal-dialog text-center" id="modal-dialog">
                <div className="col-sm-8 main-section">
                  <div className="modal-content" id="modal-content">
                    <div className="col-12 user-img">
                      <img src={face} alt="" />
                      <h1>Sign Up</h1>
                    </div>

                    <form className="col-12" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="firstName">first name</label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">last name</label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control"
                          onChange={this.handleChange}
                        />
                      </div>

                      <button type="submit" className="btn" id="btn">
                        <FontAwesomeIcon
                          icon="sign-in-alt"
                          style={{ fontSize: "20px", marginRight: "7px" }}
                        />
                        Sign Up
                      </button>
                      <div className="col-12 forgot">
                        {authError ? (
                          <h5 style={{ color: "#E74C3C" }}>{authError}</h5>
                        ) : null}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
