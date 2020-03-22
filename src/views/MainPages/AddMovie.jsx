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

    this.state = {mtitle: "",
                  moviesynopsis: "",
                  moviereleasedate: "",   
                  alerttext: "",
                  alertvisible: false           
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
          <div className="content-center brand">  
          <h3 className="d-none d-sm-block">
              Add a movie
            </h3>
            <Card>
      <CardBody>
        <form onSubmit ={this.onSubmit}>
          <FormGroup>
            <Label for="movietitle">Movie Title</Label>
            <Input
              type="text"
              name="movietitle"
              id="mtitle"
              placeholder="Movie Title"
              value = {this.state.mtitle}
              onChange={this.onChangeMovieTitle}
            />
          </FormGroup>
          <FormGroup>
            <Label for="synopsis">Movie Synopsis</Label>
            <Input 
            type="textarea" 
            name="moviesynopsis"
            id="exampleText"
            placeholder="Movie Synopsis" 
            classname = "form-control" 
            style = {textareastyle} 
            value = {this.state.moviesynopsis}
            onChange={this.onChangeMovieSynopsis}
            />
          </FormGroup>
          <FormGroup>
          <Label for="releasedate">Movie Release Date</Label>
                  <Datetime
                  timeFormat={false}
                  /* value = {this.state.moviereleasedate}
                  onChange = {this.onChangeMovieReleaseDate} */
                    inputProps={{
                      name: "moviereleasedate",
                      className: "form-control",
                      value: this.state.moviereleasedate,
                      onChange: this.onChangeMovieReleaseDate

                    }}
                  />
                </FormGroup>        
                <FormGroup>
                  <Row>
                  <Alert 
                  color="warning"
                  isOpen={this.state.alertvisible}
                  >
                    {this.state.alerttext}</Alert>
                  </Row>
                <Row>
            <Col>
          <Input
                type = "submit"
                className="btn-simple btn-round icon"
                color="primary"  
                value="Add Movie"           
              >               
              </Input>    
              </Col> 
              </Row>
                </FormGroup> 
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
