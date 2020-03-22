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

import IndexNavbar from "components/Navbars/IndexNavbar.jsx";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

class ListMovies extends React.Component {

  componentDidMount() {
    document.body.classList.toggle("profile-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("profile-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <Container>
            <div className="content-center brand">
            <h1 className="h1-seo">All Movies</h1>
            <h3 className="d-none d-sm-block">
              Here's all the movies we have.              
            </h3>
            <h3 className="d-none d-sm-block">
              At least here's an idea of what it will look like. Let's call it a template.            
            </h3>
            </div>
            </Container>
            </div>
            
            <div className="section">
            <Container className="align-items-center">
              <Row>
                <Col lg="6" md="6">
                  <h1 className="profile-title text-left">Blade Runner 2049</h1>
                  <h5 className="text-on-back">01</h5>                  
                  <div className="btn-wrapper profile pt-3"> 
                  <p className="profile-description">
                  Young Blade Runner "K"'s (Ryan Gosling's) discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard (Harrison Ford), who's been missing for thirty years.
                  </p>                        
                  </div>
                </Col>
                <Col className="ml-auto mr-auto" lg="4" md="6"> 
                <img
              alt="..."
              className=" "
              src={require("assets/img/movieposter.jpeg")}
            />               
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="6">
                  <h1 className="profile-title text-left">Metropolis</h1>
                  <h5 className="text-on-back">02</h5>                  
                  <div className="btn-wrapper profile pt-3"> 
                  <p className="profile-description">
                  In a futuristic city sharply divided between the working class and the city planners, the son of the city's mastermind falls in love with a working class prophet who predicts the coming of a savior to mediate their differences.
                  </p>                        
                  </div>
                </Col>
                <Col className="ml-auto mr-auto" lg="4" md="6"> 
                <img
              alt="..."
              className=" "
              src={require("assets/img/Metropolis.jpg")}
            />               
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="6">
                  <h1 className="profile-title text-left">Ruby Sparks</h1>
                  <h5 className="text-on-back">03</h5>                  
                  <div className="btn-wrapper profile pt-3"> 
                  <p className="profile-description">
                  A novelist struggling with writer's block finds romance in a most unusual way: by creating a female character he thinks will love him, then willing her into existence.
                  </p>                        
                  </div>
                </Col>
                <Col className="ml-auto mr-auto" lg="4" md="6"> 
                <img
              alt="..."
              className=" "
              src={require("assets/img/RubySparks.jpg")}
            />               
                </Col>
              </Row>
              </Container>
              </div>
          
          </div>
      </>
    );
  }
}

export default ListMovies;