import React from "react";

import { Router, Route, Link } from "react-router-dom";
import {
    Row,
    Col,
  } from "reactstrap";

class Movie extends React.Component {
    constructor(props) {
        super(props);        
      this.state = {
        moviestate: "",
        idstate: "",
        moviename: this.props.obj.movieName,
        movieid: this.props.obj.movieID,
        imagepath: ""
      };
    }
    firstletter(str)
    {
        return str.charAT(1);
       
    }
    onClickMovie = (name, id) =>
    {
                   
                    localStorage.setItem('moviestate', name);
                    localStorage.setItem('idstate', id);               
    }
    componentDidMount() 
    {
      this.setState({ imagepath: ""});
      this.setState({imagepath: `http://thomasjohnoleary.com/notimdb/static/media/${this.props.obj.movieName}.jpg`});
    }
    render() {
       
        return (
        <Row>
        <Col lg="6" md="6">
          <h1 className="profile-title">{this.props.obj.movieName}</h1>
          <h6 className="text-on-back">{this.props.obj.movieName.charAt()}</h6>                  
          <div className="btn-wrapper profile"> 
          <p className="profile-description">
          {this.props.obj.movieSynopsis}
          </p>                        
          </div>
        </Col>
        <Col className="ml-auto mr-auto" lg="4" md="6">
            <Link to= {{
                pathname:"/movie-page",                
                aboutProps:{
                    movieName: this.props.obj.movieName,
                    movieID: this.props.obj.movieID                      
                }
            }}
            onClick={() => {this.onClickMovie(this.props.obj.movieName, this.props.obj.movieID );}} >
        
        <img
      alt="..."
      className={this.props.obj.movieName}
      src={this.state.imagepath}
    />   
    </Link>
        </Col>
      </Row>
        );
    }
}

export default Movie;