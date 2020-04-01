import React from "react";


class EditMovieList extends React.Component {

    render() {
        
        return (            
        <option style={{color: "black"}} value={this.props.obj.movieID}>{this.props.obj.movieName} - {this.props.obj.movieReleaseDate.substring(0, 4)}</option>
        );
    }
}

export default EditMovieList;