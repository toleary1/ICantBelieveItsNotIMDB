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
import Forms from "views/IndexSections/Forms.jsx";

// reactstrap components
import {
   Container,
   Button,
   } from "reactstrap";

class AddMovieHeader extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
        <Container>
          <div className="content-center brand">  
          <h3 className="d-none d-sm-block">
              Add a movie
            </h3>
          <Forms />  
          <Button
                className="btn-simple btn-round"
                color="primary"
                // to="add-movie"
                // tag={Link}
              >
                Add Movie
              </Button>     
          </div>
        </Container>
      </div>
    );
  }
}

export default AddMovieHeader;