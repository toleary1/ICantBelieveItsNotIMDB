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
import axios from "axios";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Movie from "components/Movie.jsx";

// reactstrap components
import {
  Container,
} from "reactstrap";

class ListMovies extends React.Component {
constructor(props) {
  super(props);
  this.state = { movies: [] };
                 
}

  componentDidMount() {
    document.body.classList.toggle("profile-page");
    // Axios get that pulls the movies from the listmovies.php file and fills the movies array
    // with the database response
    axios
    .get(
      "http://thomasjohnoleary.com/notimdb/listmovies"
    )
    .then(response => {
      //sets the database response into the array
      this.setState({movies: response.data});
    })
    .catch(function (error) { 
      console.log(error);
    })
  }

  // function that maps through the array and runs the Movie component for each index
  // populating the movie list
  MovieList () {
    return this.state.movies.map(function (object, i) {
      return <Movie obj={object} key={i} />
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
          <div className="page-header">
            <div className="content-center brand">
            <h1 className="h1-seo">I Can't Believe It's Not IMDB</h1>
            <h3 className="d-none d-sm-block">
              All Movies            
            </h3>
            </div>
            </div>            
            <div className="section" style={{padding: "0px"}}>
            <Container className="align-items-center">
              {this.MovieList()}
              </Container>
              </div>          
          </div>
      </>
    );
  }
}

export default ListMovies;
