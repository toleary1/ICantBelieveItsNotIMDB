import React from "react";
import {
    Row,
    Col,
  } from "reactstrap";

class FillCastList extends React.Component {


    render() {
        return (
            <Row className="justify-content-md-center">                                    
                    <Col  className="text-center"> 
                    <h3>{this.props.obj.actorFirstName} {this.props.obj.actorLastName} as {this.props.obj.actorRole}</h3>
                    </Col>
                    </Row>  
        );
    }
}

export default FillCastList;