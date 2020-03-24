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
import Axios from "axios";

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Alert
} from "reactstrap";
import Datetime from "react-datetime";
var max_chars = 500;

const textareastyle = {
  border: '1px solid #2b3553',
}

class AddMovie extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }

  constructor(props)
  {
    super(props);
    this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
    this.onChangeMovieSynopsis = this.onChangeMovieSynopsis.bind(this);
    this.onChangeMovieReleaseDate = this.onChangeMovieReleaseDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.charactersLeft = this.charactersLeft.bind(this);

    this.state = {mtitle: "",
                  moviesynopsis: "",
                  moviereleasedate: "",   
                  alerttext: "",
                  alertvisible: false,
                  value:""         
            };
  }
  onChangeMovieTitle(e) {
    this.setState({
      mtitle: e.target.value
    });
  }
  onChangeMovieSynopsis(e) {
    this.setState({
      moviesynopsis: e.target.value
    });
  }
  onChangeMovieReleaseDate(e) {
    this.setState({
      moviereleasedate: e.target.value
    });
  }
  
  charactersLeft(event) {
    var input = event.target.value;
    this.setState({
      chars_left: max_chars - input.length
    });
  }
  onSubmit(e) {
   e.preventDefault();

   const obj = {
     objmovietitle: this.state.mtitle,
     moviesynopsis: this.state.moviesynopsis,
     moviereleasedate: this.state.moviereleasedate
   };
   console.log(obj);
   Axios
    .post("https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/insertmovie", obj)
    .then(function(response){
      console.log(response); 
  })
    .catch(function (error) {
    console.log(error); 
    })

    this.setState({
      alerttext: this.state.mtitle + " added successfully",
      alertvisible: true,
      mtitle: "",
      moviesynopsis: "",
      moviereleasedate: "",
    });      
  }

  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }


  render() {
    return (
      <>
        <IndexNavbar />
        <div className="page-header header-filter">
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div className="content-center brand" style={{width: "75%"}}>  
          <h3 className="d-none d-sm-block">
              Add a movie
            </h3>
            <Card>
        <CardBody>
          <form>
            <div className="form-row">
              <FormGroup className="col-md-5">
                <Label for="inputEmail4">Movie Title</Label>
                <Input 
                type="text"
                name="movietitle"
                id="mtitle"
                placeholder="Movie Title"
                value = {this.state.mtitle}
                onChange={this.onChangeMovieTitle}/>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="inputPassword4">Release Date</Label>
                <Input 
                type="text"  
                id="mdate" 
                placeholder="Release Date"/>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="inputPassword4">Genre</Label>
                <Input 
                type="text"  
                id="genre" 
                placeholder="genre"/>
              </FormGroup>
            </div>
            <FormGroup>
              {/* Characters left code from https://stackoverflow.com/questions/33079204/how-to-create-a-twitter-like-remaining-characters-count-with-react*/}
              <Label for="synopsis">Movie Synopsis - Characters Left: {this.state.chars_left}/500</Label>
              <Input 
              type="textarea" 
              name="moviesynopsis"
              id="exampleText"
              placeholder="Movie Synopsis" 
              classname = "form-control"
              multiline = {true}
              maxLength = {500}               
              style = {textareastyle} 
              onChange={this.charactersLeft}/>
            </FormGroup>
            <Label for = "addactor" style={{margin: "15px"}}>Add an Actor</Label>
            <div className="form-row">              
              <FormGroup className="col-md-4">
                <Label for="firstname">First Name</Label>
                <Input 
                type="text"  
                name = "firstname" 
                id="firstname"
                placeholder="First Name"/>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="lastname">Last Name</Label>
                <Input 
                type="text" 
                name="lastname" 
                id="lastname"
                placeholder="Last Name" >
                </Input>
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="role">Role</Label>
                <Input 
                type="text"  
                name="role"
                id="role"
                placeholder="Role"/>
              </FormGroup>
            </div>
            <Button type="submit" color="primary">Add Movie</Button>
            <Button type="button" color="primary">Add Another Actor</Button>
            <Button type="button" color="primary">Upload Movie Poster</Button>
          </form>
        </CardBody>
      </Card>
          </div>
        </Container>
      </div>
      </>
    );
  }
}

export default AddMovie;
