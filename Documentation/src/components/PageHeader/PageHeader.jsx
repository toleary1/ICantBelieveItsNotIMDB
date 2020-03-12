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
// reactstrap components
import {
   Container,
   Button,
   } from "reactstrap";

class PageHeader extends React.Component {
  render() {
    return (
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
            <Button
                className="btn-simple btn-round"
                color="primary"
                to="add-movie"
                tag={Link}
              >
                Add Movie
              </Button>
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;