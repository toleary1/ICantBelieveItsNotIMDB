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
import EditMovieList from 'components/EditMovieList.jsx';
import EditCastList from 'components/EditCastList.jsx';
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
  Col,
  Alert,
  Modal
} from "reactstrap";
import Datetime from "react-datetime";
var max_chars = 500;




class EditMovie extends React.Component {

  constructor(props)
  {
    super(props);
    this.onChangeMovieTitle = this.onChangeMovieTitle.bind(this);
    this.onChangeMovieSynopsis = this.onChangeMovieSynopsis.bind(this);
    this.onChangeMovieReleaseDate = this.onChangeMovieReleaseDate.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.charactersLeft = this.charactersLeft.bind(this);
    this.onChangeMovie = this.onChangeMovie.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.state ={
      image: null,   
      moviegenre: "",
      selectedmovie: "",
      mtitle: "",
      moviesynopsis: "",
      moviereleasedate: "", 
      alerthidden: true,
      addmoviealert: "",
      selectedmovieid: "",
      selectplaceholder: "",
      //cast: [{FirstName: "", LastName: "", Role: ""}],  
      genres: [],
      movies: [],
      castinfomap: [],
      deletemodal: false
    };
  }
  toggleDeleteModal(){
      this.setState({
          deletemodal: !this.state.deletemodal
      })
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

  onChangeMovie(e) {


      const thismovie = e.target.value;
     this.setState({
        selectedmovie: thismovie,
        castinfomap: []
    }) 
    const result = this.state.movies.find(e => e.movieID === thismovie);
    const thismoviegenre = result.GenreName;
    console.log(this.state.selectedmovieid);
    console.log(result);

    this.setState({
        selectedmovieid: result.movieID,
        mtitle: result.movieName,
        moviereleasedate: result.movieReleaseDate,
        selectplaceholder: result.GenreName,
        moviegenre: result.GenreName,
        moviesynopsis: result.movieSynopsis
    }) 
    const castinfo = {
        postmoviename: result.movieName,
        postmovieID: result.movieID
      };
      axios
      .post(
        "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/moviepage", castinfo
      )
      .then(response => {
        console.log(response.data);
        this.setState({castinfomap: response.data});
        console.log(this.state.castinfomap);
      })
      .catch(function (error) { 
        console.log(error);
      }) 
    console.log(thismoviegenre);
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
      "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/listgenres"
    )
    .then(genreresponse => {
      console.log(genreresponse.data);
      //sets the database response into the array
      this.setState({genres: genreresponse.data});
    })
    .catch(function (error) { 
      console.log(error);
    })
    axios
    .get(
        "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/listmovies"
      )
      .then(movieresponse => {
        console.log(movieresponse.data);
        //sets the database response into the array
        this.setState({movies: movieresponse.data});
      })
      .catch(function (error) { 
        console.log(error);
      })
  }
 CastList() {
     
    return this.state.castinfomap.map(function (object) {
      return <EditCastList obj={object} key={object.index} />
      
    });
  }
  GenreList () {
    return this.state.genres.map(function (object, i) {
      return <Genre obj={object} key={i} />
    });
  }
  EditMovieList () {
    return this.state.movies.map(function (object, i) {
        return <EditMovieList obj={object} key={i} />
      });
  }
  onSubmit(e) {
    this.setState({
      alerthidden: true,
      addmoviealert: ""
    })
   e.preventDefault();
    if(this.state.mtitle === "")
    {
      this.setState({
        alerthidden: false,
        addmoviealert: "Movie title field is blank"
      })
      return;
    }
    if(this.state.moviereleasedate === "")
    {
      this.setState({
        alerthidden: false,
        addmoviealert: "Release date field is blank"
      })
      return;
    }
    if(this.state.moviegenre === "")
    {
      this.setState({
        alerthidden: false,
        addmoviealert: "Movie genre field is blank"
      })
      return;
    }
    if(this.state.moviesynopsis === "")
    {
      this.setState({
        alerthidden: false,
        addmoviealert: "Movie synopsis field is blank"
      })
      return;
    }
    if(this.state.chars_left <= 0)
    {
      this.setState({
        alerthidden: false,
        addmoviealert: "Synopsis exceeds character limit"
      })
      return;
    }
    if(this.state.image !== null)
    {
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('movietitle', this.state.mtitle);
    let url = "https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/upload";
    axios.post(url, form_data, {
    headers: {
    'content-type': 'multipart/form-data'
    }
    })
    .then(res => {
    console.log(res.data);
    })
    .catch(err => console.log(err))
    }
   const obj = {
     objmovietitle: this.state.mtitle,
     objmoviesynopsis: this.state.moviesynopsis,
     objmoviereleasedate: this.state.moviereleasedate,
     objmoviegenre: this.state.moviegenre,
     objcast: this.state.castinfomap,
     objmovieid: this.state.selectedmovieid
   };
   axios
    .post("https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/editmovie", obj)
    .then(function(response){
      console.log(response);       
      
  })
    .catch(function (error) {
    console.log(error); 
    })
  /*  this.setState({
      alerthidden: false,
      addmoviealert: "Movie added successfully",
      mtitle:"",
      moviereleasedate:"",
      moviegenre:"",
      moviesynopsis:"",
      selectedmovie: "",
      image: null,
      cast: [{FirstName: "", LastName: "", Role: ""}],
    }); */
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
    if (["actorFirstName", "actorLastName", "actorRole"].includes(e.target.placeholder) ) {
      let castinfomap = [...this.state.castinfomap]
      castinfomap[e.target.dataset.id][e.target.placeholder] = e.target.value
      this.setState({castinfomap}, () => console.log(this.state.castinfomap))
    } 
    else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }
 
  addActor = (e) => {
     
    console.log(this.state.castinfomap.slice(-1, 0).actorIndex);
    console.log(this.state.castinfomap);
    var idx = this.state.castinfomap.length;
  /*  this.setState((prevState) => ({
      castinfomap: [...prevState.castinfomap, {FirstName:"", LastName:"", Role:"", actorIndex: idx}],
    })); */
    let {castinfomap} = this.state;
    var idx = castinfomap.length;
  castinfomap.map((val, idx) => {
      let firstID = `actorFirstName-${idx}`, lastID = `actorLastName-${idx}`, roleID = `actorRole-${idx}`, actorIndex = `actorIndex-${idx}`
      return(  
    <div key={idx}>
      <Row>
        <Col>
    <FormGroup >
        <Label>First Name</Label>
    <Input
    type="text"  
    name = {firstID}
    data-id={actorIndex}
    id={firstID}
    value={castinfomap[idx].actorFirstName}                                             
    placeholder="actorFirstName"/>
    </FormGroup>
    </Col>
    <Col>
    <FormGroup>
        <Label>Last Name</Label>
    <Input
    type="text" 
    name = {lastID}
    data-id={actorIndex}
    id={lastID}
    value={castinfomap[idx].actorLastName}                            
    placeholder="actorLastName" />
    </FormGroup>
    </Col>
    <Col>
    <FormGroup>
        <Label>Role</Label>
    <Input
    type="text"  
    name = {roleID}
    data-id={actorIndex}
    id={roleID}
    value={castinfomap[idx].actorRole}                
    placeholder="actorRole"/>
  </FormGroup>
  </Col>
  </Row>
  </div>  
    )
  })
  this.setState((prevState) => ({
    castinfomap: [...prevState.castinfomap, {actorFirstName:"", actorLastName:"", actorRole:"", actorIndex: idx}],
  }));
  }
  
    handleImageChange = (e) => {
      this.setState({
      image: e.target.files[0]
      })
      };
      
      clearForm() {
        window.location.reload();
      }
  render() {
    let {castinfomap} = this.state
    return (
      <>
        <IndexNavbar/>
        <div className="page-header header-filter"  style={{overflow: "auto"}}>
        <div className="squares square1" />
        <div className="squares square2" />
        <div className="squares square3" />
        <div className="squares square4" />
        <div className="squares square5" />
        <div className="squares square6" />
        <div className="squares square7" />
        <Container>
          <div className="content-center brand" style={{display: "block", width: "100%", marginTop: "200px", overflow: "auto"}}>  
          <Card>
        <CardBody>
        <form onSubmit={this.onSubmit} onChange={this.handleChange} >
          <Row>
              <Col>
          <h3 className="d-none d-sm-block text-left">
              Edit Movie
            </h3>
            </Col>
            
            <Col>
            <p>Select movie </p>
                <Input type="select" name="selectedmovieid" onChange={this.onChangeMovie} style={{backgroundcolor: "default"}}>
                <option style={{color: "black"}} value={this.state.selectedmovieid}></option>
              {this.EditMovieList ()}
               </Input>
               </Col>
            </Row>
            <Row><br></br></Row>
            <Alert color="danger" hidden={this.state.alerthidden}>{this.state.addmoviealert}</Alert>
       
          
            <div className="form-row">
              <FormGroup className="col-md-5">
                <Label for="inputEmail4">Movie Title</Label>
                <Input
                type="text"
                name="mtitle"
                id="mtitle"
                placeholder="Movie Title"
                value = {this.state.mtitle}
                onChange={this.onChangeMovieTitle}/>
              </FormGroup>
              <FormGroup className="col-md-3">
                <Label for="inputPassword4">Release Date</Label>
                <Datetime
                style={{color: "black"}}
                name="moviereleasedate"
                value={this.state.moviereleasedate}
                onChange={moment => this.onChangeMovieReleaseDate(moment)}
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                id="moviereleasedate"
                />
              </FormGroup>
              <FormGroup className="col-md-4">
                <Label for="inputPassword4">Genre</Label>
                <Input type="select" name="moviegenre" onChange={this.onChangeGenre} style={{backgroundcolor: "default"}}>
                <option  value="" id="moviegenre">{this.state.moviegenre}</option>
              {this.GenreList ()}
               </Input>
              </FormGroup>
            </div>
            <FormGroup>
              {/* Characters left code from https://stackoverflow.com/questions/33079204/how-to-create-a-twitter-like-remaining-characters-count-with-react*/}
              <Label for="synopsis">Movie Synopsis - Characters Left: {this.state.chars_left}/500</Label>
              <Input 
              type="textarea" 
              rows="6"
              name="moviesynopsis"
              id="exampleText"
              placeholder="Movie Synopsis" 
              className="moviesynopsis"
              value={this.state.moviesynopsis}
              maxLength = {500}               
              style = {{  border: "1px solid #2b3553", maxHeight: "200px"}} 
              onChange={this.charactersLeft}/>
            </FormGroup>
            <div style={{height: "300px", overflowX: "hidden", overflowY: "scroll", border: '1px solid #2b3553'}}>
            <h3 style={{margin: "15px"}}>Cast List</h3>
            
            {this.CastList ()}  
              {               
           /*   castinfomap.map((val, idx) => {
                  let firstID = `actorFirstName-${idx}`, lastID = `actorLastName-${idx}`, roleID = `actorRole-${idx}`
                  return(  
                <div key={idx}>
                  <Row>
                    <Col>
                <FormGroup >
                    <Label>First Name</Label>
                <Input
                type="text"  
                name = {firstID}
                data-id={idx}
                id={firstID}
                value={castinfomap[idx].actorFirstName}                                             
                placeholder="actorFirstName"/>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label>Last Name</Label>
                <Input
                type="text" 
                name = {lastID}
                data-id={idx}
                id={lastID}
                value={castinfomap[idx].actorLastName}                            
                placeholder="actorLastName" />
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                    <Label>Role</Label>
                <Input
                type="text"  
                name = {roleID}
                data-id={idx}
                id={roleID}
                value={castinfomap[idx].actorRole}                
                placeholder="actorRole"/>
              </FormGroup>
              </Col>
              </Row>
              </div>  
                )
              }) */
             }      
            </div>         
            <Button color="primary" onClick={this.addActor} >Add Actor</Button>        
                       

          <div className="text-center" style={{margin: "20px"}}> 
    
          <Label>Upload A Movie Poster</Label>            
          <input type="file" className="form-control"
 id="image"
 accept="image/png, image/jpeg" onChange={this.handleImageChange} />
            <div className="text-center">
            <Button  type="submit" color="primary">Submit Movie</Button> 
            
            </div>
            
            </div> 
            </form> 
            <Button color="primary" onClick={this.toggleDeleteModal}>Delete Movie</Button>
            <Modal isOpen={this.state.deletemodal} toggle={this.toggleDeleteModal}  className="text-center">
              <div className="text-center">
            <Alert color="warning">Are you sure you want to delete the movie?</Alert>
            <Button>Yes</Button>
            <Button onClick={this.toggleDeleteModal}>No</Button>
            </div>
            </Modal>
            <Button color="primary" onClick={this.clearForm} >Clear Form</Button>
            </CardBody>
      </Card>
          </div>
        </Container>
      </div>
      </>
    )
  }
}

export default withRouter(EditMovie);
