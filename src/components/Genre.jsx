import React from "react";


class Genre extends React.Component {

    render() {

        return (            
        <option style={{color: "black"}} name="moviegenre" id="moviegenre" placeholder={this.props.obj.GenreName} value={this.props.obj.GenreName}>{this.props.obj.GenreName}</option>
        );
    }
}

export default Genre;