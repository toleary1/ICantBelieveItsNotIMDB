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
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Forms from "views/IndexSections/Forms.jsx";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

class AddMovie extends React.Component {
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
          <h3 className="d-none d-sm-block">
              Add a movie
            </h3>
          <Forms />  
          <Row>
            <Col>
          <Button
                className="btn-simple btn-round"
                color="primary"
                // to="add-movie"
                // tag={Link}
              >
                Add Movie
              </Button>    
              </Col> 
              <Col>
          <Button
                className="btn-simple btn-round"
                color="primary"
                to="/"
                tag={Link}
              >
                Home
              </Button>    
              </Col> 
              </Row>
          </div>
        </Container>
      </div>
      </>
    );
  }
}

export default AddMovie;
