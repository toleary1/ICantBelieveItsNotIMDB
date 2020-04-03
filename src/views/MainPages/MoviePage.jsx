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
import FillComments from "components/FillComments.jsx";

// reactstrap components
import {
  Alert,
  Button,
  FormGroup,
  Input,
  Card,
  CardBody,
  Form,
  Container,
  Row,
  Col,
  Label
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
    this.submitReview = this.submitReview.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
  this.state = {
    moviestate: "",
    idstate: "",
    comment: "",
    commentalert: "",
    review: 1,
    alertvisible: false,
    signedInUser: localStorage.getItem('signedInUser'),
    movieinfomap: [],
    commentmap: [],
    reviewscoreaverage: 0,
    reviewalert: "",
    reviewalerthidden: true 
  }
  }


componentDidMount() {
   //scroll to the top of the page on load
   window.scrollTo(0, 0);
   //set current movie to local storage so the site doesn't crash on a page reload
    const moviestate = localStorage.getItem('moviestate');
    this.setState({moviestate});
    const idstate = localStorage.getItem('idstate');
    this.setState({idstate});
    //template class list
    document.body.classList.toggle("profile-page");

    /*
    axios post to get the movie page information
    */
    const movieinfo = {
      postmoviename: moviestate,
      postmovieID: idstate
    };    
    axios
    .post(
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/moviepage", movieinfo
    )
    .then(response => {
      this.setState({movieinfomap: response.data});
    })
    .catch(function (error) { 
      console.log(error);
    }) 
    
    /*
    axios post to get the comment info
    */
    const commentlist = {
      commentmovieID: idstate
    }; 
    axios
    .post(
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/listcomments", commentlist
    )
    .then(commentresponse => {
      this.setState({commentmap: commentresponse.data});
    })
    .catch(function (error) { 
      console.log(error);
    })   
    /*
    Axios post to get the review score information
    */
    const reviewscore = {
      postmovieID: localStorage.getItem('idstate'),
    };
    axios
    .post(
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/reviewscore", reviewscore
    )
    .then(response => {
      this.setState({reviewscoreaverage: response.data});
    })
    .catch(function (error) { 
      console.log(error);
    })  
  }
  
  /*
  Function for submitting a comment
  */
  onSubmitComment (e) {
    e.preventDefault();
    if(this.state.signedInUser === null)
    {
      //sets the alert if no one is signed in
      this.setState({
        alertvisible: true,
        commentalert: "You need to be signed in"
      });
      console.log("You need to be signed in");
      return;
    }
    const idstate = localStorage.getItem('idstate');
     /*
    axios post to submit the comment if a user is signed in
    */
    const commentinfo = {
      postuser: this.state.signedInUser,
      postmovieID: idstate,
      postcomment: this.state.comment
    };
    console.log(commentinfo);
    axios
    .post(
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/submitcomment", commentinfo
    )
    .then(response => {
      this.setState({
        alertvisible: false,
        commentalert: ""
      });
      console.log(response.data);
      this.setState({commentinfo: response.data});
      console.log(this.state.commentinfo);
      window.location.reload(false);
    })
    .catch(function (error) { 
      console.log(error);
    })    
  }
   /*
    axios post to submit a review 
    */
  submitReview (e) {
    e.preventDefault();
    this.setState({
      reviewalert: "",
        reviewalerthidden: true
    })
    //if no one is signed in set the alert to tell the user 
    if(this.state.signedInUser === null)
    {
      this.setState({
        reviewalerthidden: false,
        reviewalert: "You must be signed in to submit a review"
      });
      return;
    }
    const reviewinfo = {
      postreview: this.state.review,
      postmovieID: localStorage.getItem('idstate'),
      postuser: this.state.signedInUser
    };
    axios
    .post(
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/submitreview", reviewinfo
    )
    .then(response => {
      console.log(response.data);
      this.setState({
        reviewalert: response.data,
        reviewalerthidden: false
      })
    })
    .catch(function (error) { 
      console.log(error);
    }) 
    const reviewscore = {
      postmovieID: localStorage.getItem('idstate'),
    };
    axios
    .post(
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/reviewscore", reviewscore
    )
    .then(response => {
      this.setState({reviewscoreaverage: response.data});
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

  onChangeReview(e) {
    this.setState({
      review: e.target.value
    })
  } 
   
  // .slice to get only the first index that has the movie information
  MovieInfo () {
    return this.state.movieinfomap.slice(0,1).map(function (object, i) {
      return <FillMoviePage obj={object} key={i} />
    });
  }
  CommentInfoFill () {
    return this.state.commentmap.map(function (object, i) {
      return <FillComments obj={object} key={i} />
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
          <div className="page-header" style={{height: "25px", minHeight: "100px"}}>
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
            
            </div>
            </Container>
            </div>            
            <div className="section" style={{ padding: "5px"}}>
            <Container className="align-items-center">
            <Card>
                    <CardBody>
              {this.MovieInfo ()}   
              </CardBody>
                      </Card>                 
              </Container>
              </div> 
              <div className="section" style={{ padding: "5px"}}>  
              <Container className="align-items-center">  
              <Card>
                    <CardBody>

                    
              <Row>
                <Col lg="6" md="6">
                  <Alert hidden={this.state.reviewalerthidden}>{this.state.reviewalert}</Alert>
                <h4 className = "title text-left">Average Review Score:&nbsp;&nbsp;{this.state.reviewscoreaverage}</h4>
                </Col>
            <Col lg="6" md="6" >
            <Form onSubmit={this.submitReview}>
              <Label for="inputPassword4">Review the Movie</Label>
              <Input type="select" name="review" value={this.state.review} onChange={this.onChangeReview} style={{backgroundcolor: "default"}}>
              <option style={{color: "black"}} value="1">1</option>
              <option style={{color: "black"}} value="2">2</option>
              <option style={{color: "black"}} value="3">3</option>
              <option style={{color: "black"}} value="4">4</option>
              <option style={{color: "black"}} value="5">5</option>
            </Input>
            <Button  type="submit" color="primary" size="sm">Add Review</Button>
            </Form>
            
            </Col>
              </Row>
              </CardBody>
                      </Card>
              </Container>  
              </div>              
              <div className="section" style={{ padding: "5px"}}>
              <Container className="align-items-center">
              <Card>
                    <CardBody>
              <Row> 
                  <Col>
              <h1 className="title text-center">Cast</h1>
              </Col>
                </Row>  
                  {this.CastInfo ()}

                    <Row className="justify-content-md-center">
                    <h1 className="title text-center">Comments</h1>
                        </Row>
                       {this.CommentInfoFill ()}
                        
              <Row className="justify-content-md-center">
                <Col md="6">
                  
                   
                      
                      <Alert color="warning" isOpen={this.state.alertvisible}>
                        {this.state.commentalert}</Alert>                    
                                          
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
                      


                </Col>                
              </Row>
              </CardBody>
                      </Card>
            </Container>
            </div>
            </div>
            
      </>
 
    );
  }
}

export default MoviePage;