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
  CardHeader,
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
    reviewscoreaverage: ""    
  }
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

    //movie info axios post
    const movieinfo = {
      postmoviename: moviestate,
      postmovieID: idstate
    };
    axios
    .post(
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/moviepage", movieinfo
    )
    .then(response => {
      console.log(response.data);
      this.setState({movieinfomap: response.data});
      console.log(this.state.movieinfomap);
    })
    .catch(function (error) { 
      console.log(error);
    }) 

    //comment info axios post
    const commentlist = {
      commentmovieID: idstate
    }; 
    axios
    .post(
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/listcomments", commentlist
    )
    .then(commentresponse => {
      console.log(commentresponse.data);
      this.setState({commentmap: commentresponse.data});
      console.log(this.state.commentmap);
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
      console.log(response.data);
      this.setState({reviewscoreaverage: response.data});
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
    //comment post axios
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

  onChangeComment(e) {
    this.setState({
      comment: e.target.value
    });
  }

  onChangeReview(e) {
    this.setState({
      review: e.target.value
    })
    console.log(this.state.review);
  } 

    submitReview (e) {
      e.preventDefault();
      if(this.state.signedInUser === null)
      {
        console.log("not signed in for review");
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
      })
      .catch(function (error) { 
        console.log(error);
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
                <Col lg="6" md="6">
                <h4 className = "title text-left">Review Score: </h4>
                <h4 className = "title text-left">{this.state.reviewscoreaverage}</h4>
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
            <Button  type="submit" color="primary">Add Review</Button>
            </Form>
            </Col>
              </Row>
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
                       {this.CommentInfoFill ()}
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