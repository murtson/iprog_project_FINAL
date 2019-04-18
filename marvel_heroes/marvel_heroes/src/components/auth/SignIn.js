import React, { Component } from "react";
import "../../components/login.css";
import face from "../../images/people.png";
import "../login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    authError: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    console.log(authError);

    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="modal-dialog text-center">
                <div className="col-sm-8 main-section">
                  <div className="modal-content" id="modal-content">
                    <div className="col-12 user-img">
                      <img src={face} alt="" />
                      <h1>Sign In</h1>
                    </div>

                    <form className="col-12" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter Username"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter Password"
                          onChange={this.handleChange}
                        />
                      </div>

                      <button type="submit" className="btn" id="btn">
                        <FontAwesomeIcon
                          icon="sign-in-alt"
                          style={{ fontSize: "20px", marginRight: "7px" }}
                        />
                        Login
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
    // the return represents what methods we want to attached to the components props. props.signIn
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
