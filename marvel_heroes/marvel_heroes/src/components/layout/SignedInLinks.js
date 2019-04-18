import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const SignedInLinks = props => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">
          <FontAwesomeIcon icon={faHome} style={{ marginRight: "5px" }} />
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/collection">
          <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: "5px" }} />
          Collection
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/search">
          <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
          search
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink onClick={props.signOut} className="nav-link" to="/signin">
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "5px" }} />
          Log Out
        </NavLink>
      </li>
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    // the return represents what methods we want to attached to the components props. props.signOut
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
