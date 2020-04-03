import React from "react";

import {  Link } from "react-router-dom";
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
        imagepath: "",
        defaultimagepath: "",
        failed: false
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
      this.setState({failed: false});
      this.setState({ imagepath: ""});
      this.setState({ defaultimagepath: ""});
      this.setState({imagepath: `http://thomasjohnoleary.com/notimdb/static/media/${this.props.obj.movieName}.jpg`});
      this.setState({defaultimagepath: `http://thomasjohnoleary.com/notimdb/static/media/nopicture.jpg`})
    }
    onError = () => {
      this.setState({failed: true})
    }
    render() 
    
    {
      const defaultimage = <Row>
      <Col lg="6" md="6">
      <div className="btn-wrapper profile">
      <p className="" style={{fontSize: "2.2em"}}>
          <Link to= {{
              pathname:"/movie-page",                
              aboutProps:{
                  movieName: this.props.obj.movieName,
                  movieID: this.props.obj.movieID                      
              },
          }}
              onClick={() => {this.onClickMovie(this.props.obj.movieName, this.props.obj.movieID );}}
          style={{}}>{this.props.obj.movieName}</Link>
          </p>   
          <br></br><br></br> 
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
    onError={this.onError}
    src={this.state.defaultimagepath}
  />   
  </Link>
      </Col>
    </Row>;

    if (this.state.failed) return defaultimage;

        return (
          <Row>
        <Col lg="6" md="6">
        <div className="btn-wrapper profile">
        <p className="" style={{fontSize: "2.2em"}}>
            <Link to= {{
                pathname:"/movie-page",                
                aboutProps:{
                    movieName: this.props.obj.movieName,
                    movieID: this.props.obj.movieID                      
                },
            }}
                onClick={() => {this.onClickMovie(this.props.obj.movieName, this.props.obj.movieID );}}
            style={{}}>{this.props.obj.movieName}</Link>
            </p>   
            <br></br><br></br> 
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
      onError={this.onError}
      src={this.state.imagepath}
    />   
    </Link>
        </Col>
      </Row>
        );
    }
}

export default Movie;