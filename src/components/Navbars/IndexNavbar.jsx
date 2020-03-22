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
import { Link } from "react-router-dom";
import classnames from "classnames";
import Axios from "axios";

// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Modal,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Alert
} from "reactstrap";

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    /* Function binds*/
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    this.onSignIn = this.onSignIn.bind(this);

    /* Set State Variables */
    this.state = {
      /* Binary state variables */
      formModal: false,
      collapseOpen: false,
      signin: false,
      register: false,
      hidden: true,
      alertvisible: false,      
      signInHidden: false,
      registerHidden: false,
      showUsername: true,      
      logOutHidden: true,
      /* Non-binary state variables*/
      color: "navbar-transparent",
      username: "",
      email: "",
      password: "",
      passwordconfirm: "",
      alerttext: "",
      signedInUser: ""      
      
    };
  }
  /* Toggle the modal to show or hide and reset state variables*/
  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState],
      username: "",
      email: "",
      password: "",
      passwordconfirm: "",
      alertvisible: false,
      alerttext: ""
    });
  }
  /* Functions to change states in forms */
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangePasswordConfirm(e) {
    this.setState({
      passwordconfirm: e.target.value
    })
  }
  /* Function that runs when register form is submitted.
     Makes the Axios call and does what it needs to based on 
     the response from the .php page*/
  onSubmitRegister(e) {
    e.preventDefault();
    if(this.state.password === this.state.passwordconfirm)
    {
    const reg = {
      regusername: this.state.username,
      regemail: this.state.email,
      regpassword: this.state.password,
      regpasswordconfirm: this.state.passwordconfirm
    };

    Axios
     .post("https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/register", reg)
     .then(function(response){
       console.log(response); 
   })
     .catch(function (error) {
     console.log(error); 
     })
 
     this.setState({
       alerttext: "Successfully registered. Please sign in.",
       alertvisible: true,
       username: "",
       email: "",
       password: "",
       passwordconfirm: ""
     });    
  }
  if(this.state.password !== this.state.passwordconfirm)
  {
    this.setState({
      alerttext: "Password not confirmed. Please try again.",
      alertvisible: true,
      password: "",
      passwordconfirm: ""
    })
  }
}

/* Function that runs when the sign-in form is submitted
   Makes the Axios call and upon success hides the buttons in the nav bar
   for register/sign-in and replaces it with the username welcome text*/
onSignIn(e) {
  e.preventDefault();

  const signin = {
    signinname: this.state.username,
    signinpassword: this.state.password
  };

  Axios
   .post("https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/signin", signin)
   .then(result => {
     this.setState({     
                signedInUser: result.data,           
                signInHidden: true,
                registerHidden: true,
                showUsername: false
                }); 
                this.toggleModal("signin");   
 })
   .catch(error => {
   console.log(error); 
   this.setState({                
                alerttext: "Invalid Login",
                alertvisible:"true"
                });
   }) 
}
  
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  /* componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  } */

  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title="Designed and Coded by Creative Tim"
              tag={Link}
            >              
              I Can't Believe It's Not IMDB
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited} 
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    BLK•React
                  </a>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>              
              <NavItem hidden={this.state.registerHidden}>
                <Button                  
                  className="nav-link d-none d-lg-block"
                  color="info"
                  onClick={() => this.toggleModal("register")}
                >
                  <i className="tim-icons icon-bell-55" /> Register
                </Button>
              </NavItem>
              <NavItem hidden={this.state.signInHidden}>
                <Button                 
                  className="nav-link d-none d-lg-block"
                  color="info"
                  onClick={() => this.toggleModal("signin")}
                >
                  <i className="tim-icons icon-tap-02" /> Sign In
                </Button>
                <NavItem>                
            </NavItem>
            {/* Sign-in Modal start*/}
            <Modal
              modalClassName="modal-black"
              isOpen={this.state.signin}
              toggle={() => this.toggleModal("signin")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("signin")}
                >
                  <i className="tim-icons icon-simple-remove text-white" />
                </button>
                <div className="text-muted text-center ml-auto mr-auto">
                  <h3 className="mb-0">Sign in to your profile</h3>
                </div>
              </div>
              <div className="modal-body">                
                <Form onSubmit={this.onSignIn}>
                  <FormGroup className="mb-3">
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.emailFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username"
                        type="text"
                        onFocus={e => this.setState({ emailFocus: true })}
                        onBlur={e => this.setState({ emailFocus: false })}
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.passwordFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type={this.state.hidden ? "password" : "text"}
                        onFocus={e => this.setState({ passwordFocus: true })}
                        onBlur={e => this.setState({ passwordFocus: false })}
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Alert 
                  color="warning"
                  isOpen={this.state.alertvisible}
                  >
                    {this.state.alerttext}</Alert>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Sign in
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal>
              {/*Sign-in Modal end*/}
              </NavItem>
              <NavItem>
                {/* Register Modal start */}
              <Modal
              modalClassName="modal-black"
              isOpen={this.state.register}
              toggle={() => this.toggleModal("register")}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  onClick={() => this.toggleModal("register")}
                >
                  <i className="tim-icons icon-simple-remove text-white" />
                </button>
                <div className="text-muted text-center ml-auto mr-auto">
                  <h3 className="mb-0">Register</h3>
                </div>
              </div>
              <div className="modal-body">                
                <Form onSubmit ={this.onSubmitRegister}>
                  <FormGroup className="mb-3">
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.usernameFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username"
                        type="text"
                        onFocus={e => this.setState({ usernameFocus: true })}
                        onBlur={e => this.setState({ usernameFocus: false })}
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.emailFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="E-Mail"
                        type="text"
                        onFocus={e => this.setState({ emailFocus: true })}
                        onBlur={e => this.setState({ emailFocus: false })}
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.passwordFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type={this.state.hidden ? "password" : "text"}
                        onFocus={e => this.setState({ passwordFocus: true })}
                        onBlur={e => this.setState({ passwordFocus: false })}
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup
                      className={classnames("input-group-alternative", {
                        "input-group-focus": this.state.passwordcheckFocus
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Confirm Password"
                        type={this.state.hidden ? "password" : "text"}
                        onFocus={e => this.setState({ passwordcheckFocus: true })}
                        onBlur={e => this.setState({ passwordcheckFocus: false })}
                        value={this.state.passwordconfirm}
                        onChange={this.onChangePasswordConfirm}
                      />
                    </InputGroup>
                    <Row>
                  <Alert 
                  color="warning"
                  isOpen={this.state.alertvisible}
                  >
                    {this.state.alerttext}</Alert>
                  </Row>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Register
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal>
              {/* Register Modal end */}
              </NavItem>
              <Container hidden={this.state.showUsername}>
            <span className="navbar-text">
              Welcome, {this.state.signedInUser}!
            </span>
          </Container>
          <NavItem hidden={this.state.logOutHidden}>
                <Button                 
                  className="nav-link d-none d-lg-block"
                  color="default"
                  onClick={() => this.toggleModal("signin")}
                >
                  <i className="tim-icons icon-tap-02" /> Log Out
                </Button>              
            </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default ComponentsNavbar;
