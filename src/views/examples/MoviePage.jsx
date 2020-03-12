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

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
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
    
componentDidMount() {
   
    document.body.classList.toggle("profile-page");
    
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
              <Row>                
                <Col className="ml-auto mr-auto" lg="4" md="6"> 
                <img
              alt="..."
              className=" "
              src={require("assets/img/movieposter.jpeg")}
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
              src={require("assets/img/RyanGosling.jpg")}
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
              src={require("assets/img/HarrisonFord.jpg")}
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
              src={require("assets/img/AnaDeArmas.jpg")}
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