import React from "react";
import {
    Row,
    Col,
  } from "reactstrap";

class FillComments extends React.Component {


    render() {
        return (
            <Row className="justify-content-md-center">
                            <blockquote>
                            <p className="blockquote blockquote-info">
                                {this.props.obj.commentContent} 
                                <br></br>
                                <br></br>
                                {this.props.obj.userName} - {this.props.obj.commentDate}
                            </p>
                            </blockquote>
                        </Row>
        );
    }
}

export default FillComments;