/*!

=========================================================
* BLK Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";
import "assets/demo/demo.css";
import Index from "views/Index.jsx";
import AddMovie from "views/MainPages/AddMovie.jsx";
import ListMovies from "views/MainPages/ListMovies.jsx";
import MoviePage from "views/MainPages/MoviePage.jsx";

ReactDOM.render(
  <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
    <Switch>
      <Route path="/components" render={props => <ListMovies {...props} />} />      
      <Route
        path="/add-movie"
        render={props => <AddMovie {...props} />}
      />
      <Route
        path="/list-movies"
        render={props => <ListMovies {...props} />}
      />
      <Route onUpdate={() => window.scrollTo(0, 0)}
        path="/movie-page"
        render={props => <MoviePage {...props} />}
      />
      <Redirect from="/" to="/components" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);

/* 
<a href="/#/movie-page">
</a>
*/
