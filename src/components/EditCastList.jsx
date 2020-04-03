import React from "react";
import {
    Row,
    FormGroup,
    Label,
    Input,
    Col,
  } from "reactstrap";

class EditCastList extends React.Component {
    
      state= {
        actorindex: this.props.obj.actorIndex,
        actorFirstName: this.props.obj.actorFirstName,
        actorLastName: this.props.obj.actorLastName,
        actorRole: this.props.obj.actorRole
        //firstID: `FirstName-${this.props.obj.actorIndex}`
    }
    render() {
        let firstID = `actorirstName-${this.props.obj.actorIndex}`, lastID = `actorLastName-${this.props.obj.actorIndex}`, roleID = `actorRole-${this.props.obj.actorIndex}`

            let {actorindex, actorFirstName, actorLastName, actorRole} = this.state;
            return (         
            <Row>
              <Col>
          <FormGroup >
              <Label>First Name</Label>
          <Input
          type="text"  
          name = {firstID}
          data-id={actorindex}
          id={firstID}
          defaultValue={actorFirstName} 
          onChange={this.handleChange}                                            
          placeholder="actorFirstName"/>
          </FormGroup>
          </Col>
          <Col>
          <FormGroup>
              <Label>Last Name</Label>
          <Input
          type="text" 
          name = {lastID}
          data-id={actorindex}
          id={lastID}
          defaultValue={actorLastName} 
          onChange={this.handleChange}                           
          placeholder="actorLastName" />
          </FormGroup>
          </Col>
          <Col>
          <FormGroup>
              <Label>Role</Label>
          <Input
          type="text"  
          name = {roleID}
          data-id={actorindex}
          id={roleID}
          defaultValue={actorRole}
          onChange={this.handleChange}                
          placeholder="actorRole"/>
        </FormGroup>
        </Col>
        </Row>  
        
            )
    }}

export default EditCastList;        