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
<<<<<<< Updated upstream
import { Link } from "react-router-dom";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";

=======
//import { Link } from "react-router-dom";
import { BrowserRouter as Link } from 'react-router-dom';
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
/*
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import ScrollToTopRoute from "components/ScrollToTopRoute.jsx";
*/
>>>>>>> Stashed changes
import {
  Container,
  Button,
  Row,
  Col
  } from "reactstrap";

class Index extends React.Component {


  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">I Can't Believe It's Not IMDB</h1>
            <h3 className="d-none d-sm-block">
              Here's going to be a list of available pages.
              This page is just a placeholder until functionality is in place.
            </h3>
            <Row>
              <Col>
            <Button
                className="btn-simple btn-round"
                color="primary"
                to="add-movie"
                tag={Link}
              >
                Add Movie
              </Button>
              </Col>
              <Col>
              <Button
                className="btn-simple btn-round"
                color="primary"
                to="list-movies"
                tag={Link}
              >
                List Movies
              </Button>
              </Col>
              <Col>
              <Button
                className="btn-simple btn-round"
                color="primary"
                to="movie-page"
                tag={Link}
              >
                Movie Page
              </Button>
              </Col>
              </Row>
              <br></br>
              <h3 className="d-none d-sm-block">
              Where do you register and sign in? 
              The handy dandy buttons on the navigation bar.
            </h3>
          </div>
        </Container>
      </div>
      </>
    );
  }
}

export default Index;
