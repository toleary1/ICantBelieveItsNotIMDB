import React from "react";
import {
    Row,
    Col,
  } from "reactstrap";

class FillMoviePage extends React.Component {


    render() {
        return (
            <Row>                
            <Col className="ml-auto mr-auto" lg="4" md="6"> 
            <img
          alt="..."
          className=" "
          src={`http://thomasjohnoleary.com/notimdb/static/media/${this.props.obj.movieName}.jpg`}
        />               
            </Col>
            <Col lg="6" md="6">
                <div>
              <h1>{this.props.obj.movieName}</h1>
              </div>               
              <div className="btn-wrapper profile pt-3">  
              <br></br> 
              <p className="profile-description">
              {this.props.obj.movieSynopsis}
              </p>   
              <p> </p>
              <h4 className = "title text-left">Genre: &nbsp;{this.props.obj.GenreName}</h4> 
              <h4 className = "title text-left">Release Date: &nbsp;{this.props.obj.movieReleaseDate}</h4>           
              </div>
            </Col>
          </Row>   
        );
    }
}

export default FillMoviePage;