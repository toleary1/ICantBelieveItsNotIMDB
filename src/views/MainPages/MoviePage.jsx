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
<<<<<<< Updated upstream
import gosling from "assets/img/RyanGosling.jpg";
import Harrison from "assets/img/HarrisonFord.jpg";
import Ana from "assets/img/AnaDeArmas.jpg";
import BladeRunner2049 from "assets/img/movieposter.jpeg";

=======
import axios from 'axios';
import FillMoviePage from "components/FillMoviePage.jsx";
import FillCastList from "components/FillCastList.jsx";
import FillComments from "components/FillComments.jsx";
>>>>>>> Stashed changes
// reactstrap components
import {
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

const imgstyle = {
       width: '120px',
    };
const textareastyle = {
    border: '1px solid #2b3553',
    resize: 'vertical',
    height: '1000px',
};
const selectstyle = {
    background: 'black',
}
class MoviePage extends React.Component {
<<<<<<< Updated upstream
    
=======
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


>>>>>>> Stashed changes
componentDidMount() {
   
    document.body.classList.toggle("profile-page");
<<<<<<< Updated upstream
    
=======

    //movie info axios post
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

    //comment info axios post
    const commentlist = {
      commentmovieID: idstate
    }; 
    axios
    .post(
      "http://thomasjohnoleary.com/notimdb/listcomments", commentlist
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
      "http://thomasjohnoleary.com/notimdb/reviewscore", reviewscore
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
        "http://thomasjohnoleary.com/notimdb/submitreview", reviewinfo
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
>>>>>>> Stashed changes
  }
  componentWillUnmount() {
    document.body.classList.toggle("profile-page");
  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <div className="page-header">
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
            <h1 className="h1-seo">Movie Page</h1>
            <h3 className="d-none d-sm-block">
              Here's what a selected movie will look like              
            </h3>
            </div>
            </Container>
            </div>            
            <div className="section">
            <Container className="align-items-center">
<<<<<<< Updated upstream
              <Row>                
                <Col className="ml-auto mr-auto" lg="4" md="6"> 
                <img
              alt="..."
              className=" "
              src={BladeRunner2049}
            />               
                </Col>
                <Col lg="6" md="6">
                  <h1 className="profile-title text-left">Blade Runner 2049</h1>
                  <h5 className="text-on-back">01</h5>                  
                  <div className="btn-wrapper profile pt-3"> 
                  <h4 class = "title text-left">Synopsis</h4>    
                  <p className="profile-description">
                  Young Blade Runner "K"'s (Ryan Gosling's) discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard (Harrison Ford), who's been missing for thirty years.
                  </p>   
                  <p> </p>
                  <h4 class = "title text-left">Release Date: 2017</h4>            
                  </div>
                </Col>
              </Row>              
=======
              {this.MovieInfo ()}                    
>>>>>>> Stashed changes
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
                <Row className="justify-content-md-center">
                <Col xs lg="2"> 
                <img
              alt="..."
              style={imgstyle}
              src={gosling}
            />            
                    </Col>                    
                    <Col xs lg="2"> 
                    <p>Ryan Gosling</p>
                    </Col>
                    <Col xs lg="2"> 
                    <p>K</p>
                    </Col>
                    </Row> 
                    <Row className="justify-content-md-center">
                <Col xs lg="2"> 
                <img
              alt="..."
              style={imgstyle}
              src={Harrison}
            />            
                    </Col>                    
                    <Col xs lg="2"> 
                    <p>Harrison Ford</p>
                    </Col>
                    <Col xs lg="2"> 
                    <p>Rick Deckard</p>
                    </Col>
                    </Row>   
                    <Row className="justify-content-md-center">
                <Col xs lg="2"> 
                <img
              alt="..."
              style={imgstyle}
              src={Ana}
            />            
                    </Col>                    
                    <Col xs lg="2"> 
                    <p>Ana De Armas</p>
                    </Col>
                    <Col xs lg="2"> 
                    <p>Joi</p>
                    </Col>
                    </Row> 
                    <Row className="justify-content-md-center">
                    <h1 className="title text-center">Comments</h1>
                        </Row>
<<<<<<< Updated upstream
                        <Row className="justify-content-md-center">
                            <blockquote>
                            <p class="blockquote blockquote-info">
                                Saw it in Imax and it completely blew me away! Well worth the wait for the sequel! 
                                <br></br>
                                <br></br>
                                moviebuff212 - May 15th 2019
                            </p>
                            </blockquote>
                        </Row>
                        <Row className="justify-content-md-center">
                            <blockquote>
                            <p class="blockquote blockquote-info">
                                I don't know what the guy above me was smoking but I couldn't stay awake. Bored to tears! 
                                <br></br>
                                <br></br>
                                rainonyourparade2020 - June 18th 2019
                            </p>
                            </blockquote>
                        </Row>
              <Row>
=======
                       {this.CommentInfoFill ()}
              <Row className="justify-content-md-center">
>>>>>>> Stashed changes
                <Col md="6">
                  <Card className="card-plain">
                    <CardHeader>
                      <h1 className="profile-title text-left">Add Comment</h1>
                      <h5 className="text-on-back"><br></br></h5>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label>Comment</label>
                              <Input type="textarea" name="comment" id="commentid"
            placeholder="Enter Comment" style = {textareastyle} />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-round float-right"
                          color="primary"
                          data-placement="right"
                          id="commentbuttonid"
                          type="button"
                        >
                          Add Comment
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col xs="6">
                  <Card className="card-plain">
                    <CardHeader>
                      <h1 className="profile-title text-left">Add Rating</h1>
                      <h5 className="text-on-back"><br></br></h5>
                    </CardHeader>
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                            <Label for="inputState">Rating</Label>
                <Input type="select" name="select" id="ratingid" class="form-control" style={selectstyle} >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button
                          className="btn-round float-right"
                          color="primary"
                          data-placement="right"
                          id="tooltip341148792"
                          type="button"
                        >
                          Add Review
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