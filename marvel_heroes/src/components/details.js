import React, { Component } from "react";
import "./details.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING"
    };
  }

  componentDidMount() {
    this.props.model
      .getDetailsInfo(this.props.match.params.type, this.props.match.params.id)
      .then(data => {
        this.setState({
          status: "LOADED",
          detailsResult: data.results[0]
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  render() {
    let detailsInfo = null;
    let events_column = null;
    let comics_column = null;
    let characters_column = null;
    let stories_column = null;
    let series_column = null;

    switch (this.state.status) {
      case "LOADING":
        detailsInfo = (
          <div className="row">
            <div className="col-12 text-center">
              <h1 style={{ marginTop: "350px" }}>
                THE RESULTS ARE BEING LOADED
              </h1>
              <div className="lds-facebook">
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        );
        break;
      case "LOADED":
        if (this.props.match.params.type !== "events") {
          events_column = (
            <div
              className="col-lg-3 col-md-6 text-center"
              style={{ backgroundColor: "#EC7063" }}
              id="event_column"
            >
              <h2>Events</h2>
              <h5>
                Here you can find all the events that{" "}
                {this.state.detailsResult.name} has been a part of
              </h5>
              <p>
                (currentlig displaying:{" "}
                {this.state.detailsResult.events.items.length} out of{" "}
                {this.state.detailsResult.events.available})
              </p>
              <hr style={{ borderWidth: "2px", borderColor: "black" }} />
              {this.state.detailsResult.events.items.map(event => (
                <p key={event.name}>{event.name}</p>
              ))}
            </div>
          );
        }
        if (this.props.match.params.type !== "comics") {
          comics_column = (
            <div
              className="col-lg-3 col-md-6 text-center"
              style={{ backgroundColor: "#F7DC6F" }}
            >
              <h2>Comics</h2>
              <h5>
                Here you can find all the comics that{" "}
                {this.state.detailsResult.name} has been a part of
              </h5>
              <p>
                (currentlig displaying:{" "}
                {this.state.detailsResult.comics.items.length} out of{" "}
                {this.state.detailsResult.comics.available})
              </p>
              <hr style={{ borderWidth: "2px", borderColor: "black" }} />
              {this.state.detailsResult.comics.items.map(comic => (
                <p key={comic.name}>{comic.name}</p>
              ))}
            </div>
          );
        }
        if (this.props.match.params.type !== "stories") {
          stories_column = (
            <div
              className="col-lg-3 col-md-6 text-center"
              style={{ backgroundColor: "#73C6B6" }}
            >
              <h2>Stories</h2>
              <h5>
                Here you can find all the stories that{" "}
                {this.state.detailsResult.name} has been a part of
              </h5>
              <p>
                (currentlig displaying:{" "}
                {this.state.detailsResult.stories.items.length} out of{" "}
                {this.state.detailsResult.stories.available})
              </p>
              <hr style={{ borderWidth: "2px", borderColor: "black" }} />
              {this.state.detailsResult.stories.items.map(story => (
                <p key={story.name}>{story.name}</p>
              ))}
            </div>
          );
        }
        if (this.props.match.params.type !== "characters") {
          characters_column = (
            <div
              className="col-lg-3 col-md-6 text-center"
              style={{ backgroundColor: "#B17BF0" }}
            >
              <h2>Characters</h2>
              <h5>
                Here you can find all the characters that are a part of{" "}
                {this.state.detailsResult.name}
              </h5>
              <p>
                (currentlig displaying:{" "}
                {this.state.detailsResult.characters.items.length} out of{" "}
                {this.state.detailsResult.characters.available})
              </p>
              <hr style={{ borderWidth: "2px", borderColor: "black" }} />
              {this.state.detailsResult.characters.items.map(character => (
                <p key={character.name}>{character.name}</p>
              ))}
            </div>
          );
        }
        if (this.props.match.params.type !== "series") {
          if (this.props.match.params.type === "comics") {
            series_column = (
              <div
                className="col-lg-3 col-md-6 text-center"
                style={{ backgroundColor: "#85C1E9" }}
              >
                <h2>Series</h2>
                <h5>
                  Here you can find the serie that{" "}
                  {this.state.detailsResult.title} is a part of
                </h5>
                <p>(currently displaying 1 out of 1 )</p>
                <hr style={{ borderWidth: "2px", borderColor: "black" }} />
                {this.state.detailsResult.series.name}
              </div>
            );
          } else {
            series_column = (
              <div
                className="col-lg-3 col-md-6 text-center"
                style={{ backgroundColor: "#85C1E9" }}
              >
                <h2>Series</h2>
                <h5>
                  Here you can find all the series that{" "}
                  {this.state.detailsResult.name} has been a part of
                </h5>
                <p>
                  (currentlig displaying:{" "}
                  {this.state.detailsResult.series.items.length} out of{" "}
                  {this.state.detailsResult.series.available})
                </p>
                <hr style={{ borderWidth: "2px", borderColor: "black" }} />
                {this.state.detailsResult.series.items.map(serie => (
                  <p key={serie.name}>{serie.name}</p>
                ))}
              </div>
            );
          }
        }
        detailsInfo = (
          <div className="row">
            <div className="col-12">
              <div className="row" id="title_row">
                <div className="col-12 text-center" style={{ margin: "25px" }}>
                  <h1>
                    {this.state.detailsResult.name ||
                      this.state.detailsResult.title}
                  </h1>
                </div>
              </div>
              <div className="row" style={{ margin: "25px" }}>
                <div className="col-lg-4 col-md-12 text-center">
                  <img
                    src={
                      this.state.detailsResult.thumbnail.path +
                      "/standard_fantastic." +
                      this.state.detailsResult.thumbnail.extension
                    }
                    alt="cardtext"
                    style={{ border: "4px solid" }}
                  />
                </div>
                <div className="col-lg-4 col-md-12 text-center">
                  <h2>Type: {this.props.match.params.type}</h2>
                  <h2>ID: {this.props.match.params.id}</h2>
                  <Link to="/search">
                    <button
                      className="btn btn-primary"
                      style={{
                        marginTop: "50px",
                        marginBottom: "50px",
                        height: "50px"
                      }}
                    >
                      back to search
                    </button>
                  </Link>
                </div>
                <div className="col-lg-4 col-md-12 text-center">
                  <h2>Description</h2>
                  <h5>{this.state.detailsResult.description}</h5>
                </div>
              </div>
              <div className="row info">
                {comics_column}
                {events_column}
                {characters_column}
                {stories_column}
                {series_column}
              </div>
            </div>
          </div>
        );
        break;
      default:
        detailsInfo = (
          <div className="col-12 text-center">
            <h1>UNABLE TO LOAD RESULTS</h1>
          </div>
        );
        break;
    }
    return (
      <div className="container-fluid" id="details">
        {detailsInfo}
      </div>
    );
  }
}

export default connect()(details);
