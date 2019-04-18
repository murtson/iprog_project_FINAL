import React, { Component } from "react";
import "./search.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      type: localStorage.getItem("searchType")
    };
  }

  componentDidMount() {
    this.props.model
      .getMarvelInfo("", this.state.type)
      .then(data => {
        this.setState({
          status: "LOADED",
          marvelResult: data.results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("searchType", e.target[1].value);
    this.setState({
      status: "LOADING",
      type: e.target[1].value
    });

    this.props.model
      .getMarvelInfo(e.target[0].value, e.target[1].value)
      .then(data => {
        this.setState({
          status: "LOADED",
          marvelResult: data.results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to="/signin" />;

    let marvelList = null;
    switch (this.state.status) {
      case "LOADING":
        marvelList = (
          <div className="col-12 text-center" style={{ height: "75vh" }}>
            <h1 style={{ marginTop: "350px" }}>THE RESULTS ARE BEING LOADED</h1>
          </div>
        );
        break;
      case "LOADED":
        if (this.state.marvelResult.length === 0) {
          marvelList = (
            <div className="col-12 text-center" style={{ height: "75vh" }}>
              <h1 style={{ marginTop: "350px" }}>No results found :( </h1>
            </div>
          );
        } else {
          marvelList = this.state.marvelResult.map(marvel => (
            <div className="col-lg-2 col-sm-6" key={marvel.id}>
              <div className="card" id="resultCard" style={{}}>
                <img
                  className="card-img-top"
                  src={
                    marvel.thumbnail.path +
                    "/standard_xlarge." +
                    marvel.thumbnail.extension
                  }
                  alt="cardtext"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{marvel.name || marvel.title}</h5>
                  <p className="card-text">{marvel.description}</p>
                  <Link to={`/detail/${this.state.type}/${marvel.id}`}>
                    <button
                      href="#testlink"
                      className="btn btn-primary center-block"
                    >
                      learn more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ));
        }
        break;
      default:
        marvelList = (
          <div className="col-12 text-center" style={{ height: "75vh" }}>
            <h1>UNABLE TO LOAD RESULTS</h1>
          </div>
        );
        break;
    }

    return (
      <div className="container-fluid search">
        <div className="row" id="searchRow">
          <div className="col-12">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <h1 style={{ margin: "25px" }}>What are you searching for?</h1>
              </div>
              <div className="col-lg-6 col-sm-12 text-lg-right">
                <Link to="/">
                  <button id="homeButton" className="btn btn-primary">
                    back to Home
                  </button>
                </Link>
              </div>
            </div>
            <div className="row" style={{ marginBottom: "50px" }}>
              <form className="form" onSubmit={this.handleSubmit}>
                <input
                  id="searchBox"
                  name="searchField"
                  type="search"
                  placeholder="enter keywords"
                />
                <select className="marvelType" name="marvelType">
                  <option value="" disabled selected>
                    Choose search category
                  </option>
                  <option value="characters">characters</option>
                  <option value="comics">comics</option>
                  <option value="events">events</option>
                  <option value="series">series</option>
                </select>
                <button
                  id="searchButton"
                  className="btn btn-primary center-block"
                >
                  search
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row" id="resultRow">
          {marvelList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Search);
