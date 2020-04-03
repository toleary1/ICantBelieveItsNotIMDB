import React from "react";
import {
    Row,
    Col
  } from "reactstrap";

class FillMoviePage extends React.Component {
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
            <Col className="ml-auto mr-auto" lg="4" md="6"> 
            <img
    alt="..."
    className={this.props.obj.movieName}
    onError={this.onError}
    src={this.state.defaultimagepath}
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
            </Row>;
            if (this.state.failed) return defaultimage;   
    
            return ( 
              <Row>           
            <Col className="ml-auto mr-auto" lg="4" md="6"> 
            <img
    alt="..."
    className={this.props.obj.movieName}
    onError={this.onError}
    src={this.state.imagepath}
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