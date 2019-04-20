import React, { Component } from "react";
import "./myCollection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { addCardToShowCase } from "../store/actions/cardActions";
import { removeCardFromShowCase } from "../store/actions/cardActions";
import { sellCard } from "../store/actions/cardActions";
import { buyCardPackage } from "../store/actions/cardActions";
import { openPackage } from "../store/actions/cardActions";
import { openGift } from "../store/actions/cardActions";
import moment from "moment";

class Collection extends Component {
  state = {
    amount_1: 0,
    showOpenPackage: true
  };

  handleChange = e => {
    if (e.target.value >= 0) {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  async handleOpenPackage() {
    if (this.props.cardPackages > 0) {
      this.setState({
        showOpenPackage: false
      });
      await this.props.openPackage();
      this.setState({
        showOpenPackage: true
      });
    } else {
      alert("You have no packages to open...");
    }
  }

  handleBuyError = () => {
    this.props.buyCardPackage(this.state.amount_1);
    this.setState({
      amount_1: 0
    });
  };

  handleSellCardError = card => {
    this.props.sellCard(card);
    this.props.removeCardFromShowCase(card);
  };

  handleAddShowCaseError = card => {
    if (this.props.showCase.length >= 4) {
      alert("Your showcase can only display 4 cards");
    } else {
      for (var i in this.props.showCase) {
        if (this.props.showCase[i].cardId === card.cardId) {
          alert("That card already exists in your showcase");
          return;
        }
      }
      this.props.addCardToShowCase(card);
    }
  };

  existInShowCase(card) {
    for (var i in this.props.showCase) {
      if (this.props.showCase[i].cardId === card.cardId) {
        return true;
      }
    }
  }

  removeShowCaseCard = id => {
    this.props.removeCardFromShowCase(id);
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to="/signin" />; //chekcs so that the user is signed in, we don't want unauthorized users to have access to pages.

    let totalPrice = this.state.amount_1 * 100;
    let timeGift = null;
    let miniShowCase = null;
    let myCollectionList = null;

    // checks to see if the props lastGift exists
    if (this.props.lastGift) {
      const timeNow = new Date();
      const lastGiftTime = this.props.lastGift.toDate();

      let timeDifference = Math.floor(
        (timeNow.getTime() - lastGiftTime.getTime()) / 60000
      );
      if (timeDifference >= 59) {
        timeGift = (
          <button
            className="btn btn-primary"
            style={{ width: "100px" }}
            onClick={() => {
              this.props.openGift();
            }}
          >
            open
          </button>
        );
      } else {
        timeGift = (
          <h4 style={{ margin: "10px" }}>{59 - timeDifference} minutes</h4>
        );
      }
    }
    //checks if the showCase exists, or technically  speaking checks if the data from firebase has been loaded
    if (this.props.showCase) {
      //checks to see if there is any cards in the users showcase list, if so, display them on the screen
      if (this.props.showCase.length) {
        miniShowCase = this.props.showCase.map(card => (
          <div className="col-3 text-center" key={card.name}>
            <div
              className={"card-" + card.rarity}
              id="miniCard"
              onClick={() => {
                this.removeShowCaseCard(card);
              }}
            >
              <img
                className="card-img-top"
                style={{ height: "90px" }}
                src={card.img}
                alt="cardtext"
              />
              <div className="card-body">
                <p className="card-text">click to remove</p>
              </div>
            </div>
          </div>
        ));
        //if there is no cards in the users showcase, display this text.
      } else {
        miniShowCase = (
          <div className="col-12 text-center">
            <h2>You have no cards in your showcase</h2>
          </div>
        );
      }
      //this is displayed as long as the program is connecting to firebase. this.props.showCase have yet to "exist
    } else {
      miniShowCase = (
        <div className="col-12 text-center">
          <h2>Loading cards...</h2>
        </div>
      );
    }

    //checks if the props.collection exists, or technically speaking checks if the data from firebase has been loaded
    if (this.props.userCards && this.props.lastGift) {
      //checks to see if there is any cards in the users collection list, if so, display them on the screen
      if (this.props.userCards.length) {
        myCollectionList = this.props.userCards.map(card => (
          <div key={card.cardId} className="col-lg-6 col-xl-3" align="center">
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
                    this.handleSellCardError(card);
                  }}
                  className="btn btn-primary"
                  style={{ width: "150px" }}
                >
                  Sell
                </button>
                {this.existInShowCase(card) ? (
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#D35400", width: "150px" }}
                    onClick={() => {
                      this.removeShowCaseCard(card);
                    }}
                  >
                    remove showcase
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#F5B041", width: "150px" }}
                    onClick={() => {
                      this.handleAddShowCaseError(card);
                    }}
                  >
                    add Showcase
                  </button>
                )}
              </div>
            </div>
          </div>
        ));
        //if there is no cards in the users collection, display this text.
      } else {
        myCollectionList = (
          <div className="col-12 text-center">
            <h2>You have no cards in your collection</h2>
          </div>
        );
      }
      //this is displayed as long as the program is connecting to firebase. this.props.collection have yet to "exist
    } else {
      myCollectionList = (
        <div className="col-12 text-center" style={{ marginTop: "30vh" }}>
          <h2>Loading cards...</h2>
          <div className="lds-facebook">
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid collection" id="collection">
        <div className="row" id="test">
          <div className="col-xl-3 col-lg-12" id="toolbar">
            <div className="row" style={{ backgroundColor: "#5DADE2" }}>
              <div className="col-7">
                <h1 style={{ margin: "10px" }}>My inventory:</h1>
              </div>
              <div className="col-5 text-right">
                <Link to="/">
                  <button
                    className="Right Alignbtn btn-primary"
                    style={{ margin: "20px", width: "100px" }}
                  >
                    back to Home
                  </button>
                </Link>
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#5DADE2" }}>
              <div className="col-12">
                <h4 style={{ margin: "10px" }}>
                  <FontAwesomeIcon
                    icon="coins"
                    style={{
                      fontSize: "25px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      color: "yellow"
                    }}
                  />
                  Currency: {this.props.currency}
                </h4>
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#5DADE2" }}>
              <div className="col-8">
                <h4 style={{ margin: "10px" }}>
                  <FontAwesomeIcon
                    icon="box"
                    style={{
                      fontSize: "25px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      color: "#b22222"
                    }}
                  />
                  Card packages: {this.props.cardPackages}
                </h4>
              </div>
              <div className="col-4">
                {this.state.showOpenPackage ? (
                  <button
                    className="btn btn-primary"
                    style={{ width: "100px" }}
                    onClick={() => {
                      this.handleOpenPackage();
                    }}
                  >
                    open
                  </button>
                ) : (
                  <button
                    style={{ width: "100px" }}
                    className="btn btn-primary"
                    disabled
                  >
                    opening...
                  </button>
                )}
              </div>
            </div>
            <div
              className="row"
              style={{ backgroundColor: "#5DADE2", borderBottom: "6px solid" }}
            >
              <div className="col-8">
                <h4 style={{ margin: "10px" }}>
                  <FontAwesomeIcon
                    icon="stopwatch"
                    style={{
                      fontSize: "25px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      color: "#E74C3C"
                    }}
                  />
                  free gift in:
                </h4>
              </div>
              <div className="col-4">{timeGift}</div>
            </div>

            <div
              className="row"
              style={{
                paddingBottom: "15px",
                backgroundColor: "#a2cd48"
              }}
            >
              <h1 style={{ margin: "5px" }}>Get new cards:</h1>
            </div>
            <div className="row" id="minirow1">
              <div className="col-6">
                <h3 align="right">Package type</h3>
              </div>
              <div className="col-3">
                <h3 align="right">Amount</h3>
              </div>
              <div className="col-3">
                <h3>Price</h3>
              </div>
            </div>
            <div
              className="row"
              style={{ paddingBottom: "20px", backgroundColor: "#a2cd48" }}
            >
              <div className="col-2">
                <FontAwesomeIcon
                  icon="box"
                  style={{
                    fontSize: "30px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    color: "grey"
                  }}
                />
              </div>
              <div className="col-4" style={{ paddingTop: "3px" }}>
                <h5>1 Card package</h5>
              </div>
              <div className="col-3">
                <input
                  id="amount_1"
                  type="number"
                  value={this.state.amount_1}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-3" style={{ marginTop: "4px" }}>
                <h5>100.00</h5>
              </div>
            </div>

            <div className="row" id="minirow2">
              <div className="col-6 " style={{}}>
                <h4 align="left">Total:</h4>
              </div>
              <div className="col-6" style={{}}>
                <h4 style={{ color: "#F02E2E" }} align="right">
                  {totalPrice}
                </h4>
              </div>
            </div>
            <div className="row">
              <div
                className="col-12 text-center"
                style={{ backgroundColor: "#a2cd48", paddingBottom: "15px" }}
              >
                {this.props.currency < this.state.amount_1 * 100 ||
                this.state.amount_1 == 0 ? (
                  <button
                    className="btn-primary"
                    style={{ backgroundColor: "#BFC9CA" }}
                    disabled
                  >
                    no order
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={() => {
                      this.handleBuyError();
                    }}
                  >
                    Confirm order
                  </button>
                )}
              </div>
            </div>
            <div className="row">
              <div
                className="col-12"
                id="miniShowCase"
                style={{ borderTop: "6px solid black", paddingTop: "10px" }}
              >
                <div className="row">
                  <div className="col-12 text-center">
                    <h1>showcase</h1>
                    <p>
                      here is a fast reminder on which cards you have on your
                      showcase display. You can eaisly remove them from here.
                    </p>
                  </div>
                </div>
                <div className="row">{miniShowCase}</div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-12" id="cardCollection">
            <div className="row">
              <h2 style={{ margin: "20px" }}>CARD Collection</h2>
            </div>
            <div className="row" id="collectionRow">
              {myCollectionList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* Mapping the state off the Redux store to the props of this component, therefore all the data
we need are accesess through the props, and state of this component is no longer needed*/

const mapStateToProps = state => {
  return {
    showCase: state.firebase.profile.showCase,
    auth: state.firebase.auth,
    userCards: state.firebase.profile.cards,
    currency: state.firebase.profile.currency,
    cardPackages: state.firebase.profile.cardPackages,
    lastGift: state.firebase.profile.lastGift
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sellCard: card => dispatch(sellCard(card)),
    removeCardFromShowCase: card => dispatch(removeCardFromShowCase(card)),
    addCardToShowCase: card => dispatch(addCardToShowCase(card)),
    buyCardPackage: order => dispatch(buyCardPackage(order)),
    openPackage: () => dispatch(openPackage()),
    openGift: () => dispatch(openGift())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(["showcase", "users", "cards"])
)(Collection);
