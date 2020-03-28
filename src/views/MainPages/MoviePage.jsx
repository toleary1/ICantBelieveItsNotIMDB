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
import axios from 'axios';
import FillMoviePage from "components/FillMoviePage.jsx";
import FillCastList from "components/FillCastList.jsx";

// reactstrap components
import {
  Alert,
  Button,
  Label,
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";

const textareastyle = {
    border: '1px solid #2b3553',
    resize: 'vertical',
    height: '1000px',
};

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmitComment = this.onSubmitComment.bind(this);
  this.state = {
    moviestate: "",
    idstate: "",
    comment: "",
    commentalert: "",
    alertvisible: false,
    //oviename: props.location.aboutProps.movieName,
    signedInUser: localStorage.getItem('signedInUser'),
    //movieID: props.location.aboutProps.movieID,
    movieinfomap: []
    //castinfomap: []
  };
  }


componentDidMount() {
   // const signedInUser = localStorage.getItem('signedInUser');
   //scroll to the top of the page on load
   window.scrollTo(0, 0);
    const moviestate = localStorage.getItem('moviestate');
    this.setState({moviestate});
    const idstate = localStorage.getItem('idstate');
    this.setState({idstate});
    console.log(`Moviestate is: ${moviestate}`);
    document.body.classList.toggle("profile-page");
    const movieinfo = {
      postmoviename: moviestate,
      postmovieID: idstate
    };
    axios
    .post(
      "http://thomasjohnoleary.com/notimdb/moviepage", movieinfo
    )
    .then(response => {
      console.log(response.data);
      this.setState({movieinfomap: response.data});
      console.log(this.state.movieinfomap);
    })
    .catch(function (error) { 
      console.log(error);
    })    
  }

  onSubmitComment (e) {
    e.preventDefault();
    if(this.state.signedInUser === null)
    {
      this.setState({
        alertvisible: true,
        commentalert: "You need to be signed in"
      });
      console.log("You need to be signed in");
      return;
    }
    const idstate = localStorage.getItem('idstate');
    const commentinfo = {
      postuser: this.state.signedInUser,
      postmovieID: idstate,
      postcomment: this.state.comment
    };
    console.log(commentinfo);
    axios
    .post(
      "http://thomasjohnoleary.com/notimdb/submitcomment", commentinfo
    )
    .then(response => {
      this.setState({
        alertvisible: false,
        commentalert: ""
      });
      console.log(response.data);
      this.setState({commentinfo: response.data});
      console.log(this.state.commentinfo);
    })
    .catch(function (error) { 
      console.log(error);
    })    
  }
  onChangeComment(e) {
    this.setState({
      comment: e.target.value
    });
  }

  
  // .slice to get only the first index that has the movie information
  MovieInfo () {
    return this.state.movieinfomap.slice(0,1).map(function (object, i) {
      return <FillMoviePage obj={object} key={i} />
    });
  }
  CastInfo () {
    return this.state.movieinfomap.map(function (object, i) {
      return <FillCastList obj={object} key={i} />
    });
  }
  componentWillUnmount() {
    document.body.classList.toggle("profile-page");
  }
  render() {
    return (
           
      <>
        <IndexNavbar />
        <div className="wrapper">
          <div className="page-header" style={{minHeight: "150px"}}>
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
            <h1 className="h1-seo"></h1>
            </div>
            </Container>
            </div>            
            <div className="section">
            <Container className="align-items-center">
              {this.MovieInfo ()}          
              </Container>
              </div>
              <div className="section">
              <Container className="align-items-center">
              <Row> 
                  <Col>
              <h1 className="title text-center">Cast</h1>
              </Col>
                </Row>  
                  {this.CastInfo ()}
                    <Row className="justify-content-md-center">
                    <h1 className="title text-center">Comments</h1>
                        </Row>
                        <Row className="justify-content-md-center">
                            <blockquote>
                            <p className="blockquote blockquote-info">
                                Saw it in Imax and it completely blew me away! Well worth the wait for the sequel! 
                                <br></br>
                                <br></br>
                                moviebuff212 - May 15th 2019
                            </p>
                            </blockquote>
                        </Row>
                        <Row className="justify-content-md-center">
                            <blockquote>
                            <p className="blockquote blockquote-info">
                                I don't know what the guy above me was smoking but I couldn't stay awake. Bored to tears! 
                                <br></br>
                                <br></br>
                                rainonyourparade2020 - June 18th 2019
                            </p>
                            </blockquote>
                        </Row>
              <Row className="justify-content-md-center">
                <Col md="6">
                  <Card className="card-plain">
                    <CardHeader>
                      
                      <Alert color="warning" isOpen={this.state.alertvisible}>
                        {this.state.commentalert}</Alert>                    
                    </CardHeader>
                    <CardBody>
                      <Form onSubmit = {this.onSubmitComment}>
                        <Row className="justify-content-md-center">
                          <Col md="12">
                            <FormGroup>
                            <h1 className="text-center">Add Comment</h1>                               
                              <Input type="textarea" 
                              name="comment" 
                              id="commentid"
                              value={this.state.comment}
                              onChange={this.onChangeComment}
                              placeholder="Enter Comment" style = {textareastyle} />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-round float-right"
                          color="primary"
                          data-placement="right"
                          id="commentbuttonid"
                          type="submit"
                        >
                          Add Comment
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>                
              </Row>
            </Container>
            </div>
            </div>
            
      </>
 
    );
  }
}

export default MoviePage;