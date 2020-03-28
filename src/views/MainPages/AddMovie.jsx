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

/*
Info on making dynamic input: https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
*/
import {withRouter} from 'react-router-dom';
import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import axios from "axios";
import Genre from "components/Genre.jsx";
// reactstrap components
import {
  Button,
  Container,
  Row,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Col
} from "reactstrap";
import Datetime from "react-datetime";
var max_chars = 500;

const textareastyle = {
  border: '1px solid #2b3553',
}

class AddMovie extends React.Component {
  state = {
    mtitle: "",
    moviesynopsis: "",
    moviereleasedate: "", 
    moviegenre: "",  
    alerttext: "",
    alertvisible: false,    
    cast: [{FirstName: "", LastName: "", Role: ""}],              
    genres: [],
    image: null     
  }

  constructor(props)
  {
    super(props);
    this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
    this.onChangeMovieSynopsis = this.onChangeMovieSynopsis.bind(this);
    this.onChangeMovieReleaseDate = this.onChangeMovieReleaseDate.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.charactersLeft = this.charactersLeft.bind(this);

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
  
  onChangeGenre(e) {
    this.setState({
      moviegenre: e.target.value
    })
  }
  charactersLeft(event) {
    var input = event.target.value;
    this.setState({
      chars_left: max_chars - input.length,
      moviesynopsis: event.target.value
    });
  }

  componentDidMount() {
    const signedInUser = localStorage.getItem('signedInUser');
    if(signedInUser !== "admin")
      {
        this.props.history.push("/");
      }
    
    document.body.classList.toggle("index-page");
    axios
    .get(
      "http://thomasjohnoleary.com/notimdb/listgenres"
    )
    .then(genreresponse => {
      console.log(genreresponse.data);
      //sets the database response into the array
      this.setState({genres: genreresponse.data});
    })
    .catch(function (error) { 
      console.log(error);
    })
  }
  GenreList () {
    return this.state.genres.map(function (object, i) {
      return <Genre obj={object} key={i} />
    });
  }
  onSubmit(e) {
   e.preventDefault();

   const obj = {
     objmovietitle: this.state.mtitle,
     objmoviesynopsis: this.state.moviesynopsis,
     objmoviereleasedate: this.state.moviereleasedate,
     objmoviegenre: this.state.moviegenre,
     objcast: this.state.cast

   };
   console.log(obj);
   console.log(this.state.cast);
   axios
    .post("http://thomasjohnoleary.com/notimdb/insertmovie", obj)
    .then(function(response){
      console.log(response); 
  })
    .catch(function (error) {
    console.log(error); 
    })

   /* this.setState({
      alerttext: this.state.mtitle + " added successfully",
      alertvisible: true,
      mtitle: "",
      moviesynopsis: "",
      moviereleasedate: "", 
    });      */
  }
  onChangeMovieReleaseDate = (moment) => {
    this.setState({
      moviereleasedate: moment.toDate()
    });
  }

  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  handleChange = (e) => {
    if (["FirstName", "LastName", "Role"].includes(e.target.placeholder) ) {
      let cast = [...this.state.cast]
      cast[e.target.dataset.id][e.target.placeholder] = e.target.value
      this.setState({cast}, () => console.log(this.state.cast))
    } 
    else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
 
  addActor = (e) => {
    this.setState((prevState) => ({
      cast: [...prevState.cast, {FirstName:"", LastName:"", Role:"",}],
    }));
  }
  handleImageSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    let url = "http://thomasjohnoleary.com/notimdb/upload";
    axios.post(url, form_data, {
    headers: {
    'content-type': 'multipart/form-data'
    }
    })
    .then(res => {
    console.log(res.data);
    })
    .catch(err => console.log(err))
    };

    handleImageChange = (e) => {
      this.setState({
      image: e.target.files[0]
      })
      };
     
  render() {
    let {mtitle, moviereleasedate, cast, moviesynopsis} = this.state
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
          <div className="content-center brand" style={{width: "100%", overflow: "auto",  margintop: "300px"}}>  
          <h3 className="d-none d-sm-block">
              Add a movie
            </h3>
            <Card>
        <CardBody>
          <form onSubmit={this.onSubmit} onChange={this.handleChange} >
            <div className="form-row">
              <FormGroup className="col-md-5">
                <Label for="inputEmail4">Movie Title</Label>
                <Input
                type="text"
                name="mtitle"
                id="mtitle"
                placeholder="Movie Title"
                value = {mtitle}
                onChange={this.onChangeMovieTitle}/>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="inputPassword4">Release Date</Label>
                <Datetime
                name="moviereleasedate"
                value={moviereleasedate}
                onChange={moment => this.onChangeMovieReleaseDate(moment)}
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="inputPassword4">Genre</Label>
                <Input type="select" name="moviegenre" onChange={this.onChangeGenre} style={{backgroundcolor: "default"}}>
              {this.GenreList ()}
               </Input>
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
              className="moviesynopsis"
              value={moviesynopsis}
              maxLength = {500}               
              style = {textareastyle} 
              onChange={this.charactersLeft}/>
            </FormGroup>
            <Label for = "addactor" style={{margin: "15px"}}>Add an Actor</Label>
            
              {
              cast.map((val, idx) => {
                  let firstID = `FirstName-${idx}`, lastID = `LastName-${idx}`, roleID = `Role-${idx}`
                  return(  
                <div key={idx}>
                  <Row>
                    <Col xs="0">
                    <Label style={{fontSize: "1.2em"}}>#{idx + 1}</Label>
                    </Col>
                    <Col>
                <FormGroup>
                <Input
                type="text"  
                name = {firstID}
                data-id={idx}
                id={firstID}
                value={cast[idx].FirstName}                                             
                placeholder="FirstName"/>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                <Input
                type="text" 
                name = {lastID}
                data-id={idx}
                id={lastID}
                value={cast[idx].LastName}                            
                placeholder="LastName" />
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                <Input
                type="text"  
                name = {roleID}
                data-id={idx}
                id={roleID}
                value={cast[idx].role}                
                placeholder="Role"/>
              </FormGroup>
              </Col>
              </Row>
              </div>  
                )
              })
            }               
            <Button color="primary" onClick={this.addActor} >Add Another Actor</Button>  
           
            <div className="text-center">
            <Button  type="submit" color="primary">Add Movie</Button>  
            </div>            
          </form>
          <div className="text-center" style={{margin: "20px"}}> 
          <form onSubmit={this.handleImageSubmit}>     
          <Label>Upload A Movie Poster</Label>            
          <input type="file" className="form-control"
 id="image"
 accept="image/png, image/jpeg" onChange={this.handleImageChange} required/>
            <Button type="submit" color="primary">Upload Poster</Button>            
            </form>
            </div>
        </CardBody>
      </Card>
          </div>
        </Container>
      </div>
      </>
    )
  }
}

export default withRouter(AddMovie);
