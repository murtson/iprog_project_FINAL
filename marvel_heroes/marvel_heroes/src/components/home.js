import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { removeCardFromShowCase } from "../store/actions/cardActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Notifications from "./notifications";
import moment from "moment";

class Home extends Component {
  removeShowCaseCard = card => {
    this.props.removeCardFromShowCase(card);
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to="/signin" />;

    let showCaseList = null;
    //checks if the showCase exists, or technically  speaking checks if the data from firebase has been loaded
    if (this.props.showCase) {
      //checks to see if there is any cards in the users showcase list, if so, display them on the screen
      if (this.props.showCase.length) {
        showCaseList = this.props.showCase.map(card => (
          <div
            key={card.cardId}
            className="col-md-6 col-lg-3"
            style={{}}
            align="center"
          >
            <div className={"card-" + card.rarity} id="showCard">
              <img className="card-img-top" src={card.img} alt="cardtext" />
              <div className="card-body text-center">
                <h4 className="card-title">{card.name}</h4>
                <p className="card-text text-left">
                  <FontAwesomeIcon
                    icon="coins"
                    style={{ marginRight: "5px" }}
                  />
                  value: {card.value} <br />
                  <FontAwesomeIcon icon="gem" style={{ marginRight: "5px" }} />
                  rarity: {card.rarity}
                  <br />
                  <FontAwesomeIcon
                    icon="history"
                    style={{ marginRight: "5px" }}
                  />
                  obtained:{" "}
                  {moment(card.obtained.toDate()).format("MMM Do YYYY")}
                </p>

                <button
                  onClick={() => {
                    this.removeShowCaseCard(card);
                  }}
                  className="btn btn-primary"
                  style={{}}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ));
        //if there is no cards in the users showcase, display this text.
      } else {
        showCaseList = (
          <div className="col-12 text-center" style={{ height: "400px" }}>
            <h1>You have currently no cards in your showcase</h1>
            <h2>
              Go to "my collection" to add your favorite cards for display!
            </h2>
          </div>
        );
      }
      //this is displayed as long as the program is connecting to firebase. this.props.showCase have yet to "exist"
    } else {
      showCaseList = (
        <div className="col-12 text-center" style={{ height: "400px" }}>
          <h1>LOADING CARDS</h1>
          <h2>Please wait, we're connecting you to our server...</h2>
        </div>
      );
    }

    return (
      <div className="home">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center welcomeMessage">
              <h1>Welcome to collect a hero!</h1>

              <Link to="/search">
                <FontAwesomeIcon
                  icon="search"
                  style={{
                    fontSize: "100px",
                    margin: "30px",
                    color: "#ECF0F1"
                  }}
                />
              </Link>
              <h2>
                Looking to explore the marvel universe? Try out the search
                function!
              </h2>
            </div>
          </div>

          <div className="row">
            <Notifications notifications={this.props.notifications} />
            <div className="col-lg-6 col-md-12 text-center myCollection">
              <Link to="/collection">
                <h2 style={{ color: "#fff" }}>MY COLLECTION</h2>
              </Link>

              <div className="row" style={{ margin: "30px " }}>
                <div className="col-6 text-center">
                  <FontAwesomeIcon
                    icon="book-open"
                    style={{
                      fontSize: "50px",
                      margin: "25px",
                      color: "gold"
                    }}
                  />
                  <h4 style={{ color: "" }}>View your collection of cards</h4>
                </div>
                <div className="col-6 text-center">
                  <FontAwesomeIcon
                    icon="coins"
                    style={{
                      fontSize: "50px",
                      margin: "25px",
                      color: "yellow"
                    }}
                  />
                  <h4
                    style={{
                      textShadow:
                        "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                    }}
                  >
                    Get more packages and earn your favorite cards today!
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row showcase">
            <div className="col-12">
              <div className="row">
                <div className="col-lg-4 col-md-12" style={{ margin: "25px" }}>
                  <h2>CARD SHOWCASE</h2>
                  <h4>Your favorite cards, always close. </h4>
                </div>
              </div>

              <div className="row" id="caseDisplay">
                {showCaseList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* Mapping the state off the Redux store to the props of this component, therefore all the data
we need are accesess through the props, and State of this component is no longer needed*/

const mapStateToProps = state => {
  return {
    showCase: state.firebase.profile.showCase,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    notifications: state.firestore.ordered.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeCardFromShowCase: card => dispatch(removeCardFromShowCase(card))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(Home);
