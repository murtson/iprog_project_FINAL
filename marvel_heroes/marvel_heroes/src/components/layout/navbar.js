import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = props => {
  const { auth, profile } = props;

  //this checks if the props.auth.uid exists, which it only does if an user is signed in. Based on that, we display different kind of links
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link to="/">
        <div className="navbar-brand">Collect A Hero</div>
      </Link>

      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-targetr="#navbarMenu"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarMenu">
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
