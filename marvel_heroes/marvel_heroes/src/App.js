import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/home";
import Collection from "./components/myCollection";
import Notifications from "./components/notifications";
import Search from "./components/search";
import Details from "./components/details";
import modelInstance from "./data/model";
import Navbar from "./components/layout/navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignInAlt,
  faStopwatch,
  faPlus,
  faMinus,
  faBoxes,
  faSearch,
  faTimesCircle,
  faStar,
  faBell,
  faGem,
  faHistory,
  faCoins,
  faHandshake,
  faBookOpen,
  faUsers,
  faSignOutAlt,
  faBox,
  faUser
} from "@fortawesome/free-solid-svg-icons";

library.add(faSignInAlt);
library.add(faCoins);
library.add(faHandshake);
library.add(faBookOpen);
library.add(faUsers);
library.add(faSignOutAlt);
library.add(faBox);
library.add(faStopwatch);
library.add(faPlus);
library.add(faMinus);
library.add(faBoxes);
library.add(faSearch);
library.add(faTimesCircle);
library.add(faStar);
library.add(faUsers);
library.add(faBell);
library.add(faGem);
library.add(faHistory);
library.add(faUser);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <Navbar />

        <Route exact path="/" render={() => <Home />} />
        <Route path="/collection" render={() => <Collection />} />
        <Route path="/trades" render={() => <Notifications />} />
        <Route path="/search" render={() => <Search model={modelInstance} />} />
        <Route
          path="/detail/:type/:id"
          render={props => <Details {...props} model={modelInstance} />}
        />
        <Route path="/signin" render={() => <SignIn />} />
        <Route path="/signup" render={() => <SignUp />} />
      </div>
    );
  }
}

export default App;
