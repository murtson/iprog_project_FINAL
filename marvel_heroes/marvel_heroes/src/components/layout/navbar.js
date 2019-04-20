import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";

const mainNavbar = props => {
  const { auth } = props;

  //this checks if the props.auth.uid exists, which it only does if an user is signed in. Based on that, we display different kind of links
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      style={{ backgroundColor: "white" }}
    >
      <Link to="/">
        <div className="navbar-brand">Collect A Hero</div>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">{links}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(mainNavbar);
