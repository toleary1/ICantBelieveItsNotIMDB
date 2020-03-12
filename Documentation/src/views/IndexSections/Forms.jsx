import React from "react";
import Datetime from "react-datetime";

import {
  FormGroup,
  Label,
  Input,
  Card,
  CardBody
} from "reactstrap";
const textareastyle = {
  border: '1px solid #2b3553',
}
const Forms = () => {
  return (
    <Card>
      <CardBody>
        <form>
          <FormGroup>
            <Label for="movietitle">Movie Title</Label>
            <Input
              type="movietitle"
              name="movietitle"
              id="movietitle"
              placeholder="Movie Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="synopsis">Movie Synopsis</Label>
            <Input type="textarea" name="text" id="exampleText"
            placeholder="Movie Synopsis" classname = "form-control" style = {textareastyle} />
          </FormGroup>
          <FormGroup>
          <Label for="releasedate">Movie Release Date</Label>
                  <Datetime
                  timeFormat={false}
                    inputProps={{
                      className: "form-control",
                      placeholder: "Movie Release Date"
                    }}
                  />
                </FormGroup>          
        </form>
      </CardBody>
    </Card>
  );
};

export default Forms;
