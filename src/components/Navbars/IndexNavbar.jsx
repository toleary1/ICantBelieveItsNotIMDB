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
  Button, Collapse, NavbarBrand,
  Navbar, NavItem, Nav,
  Container, Row, Modal,
  Col, FormGroup, Input,
  InputGroup, InputGroupAddon, InputGroupText,
  Form, Alert, NavLink
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
      /* Local storage variables for saving session */ 
      signInHidden: localStorage.getItem('signInHidden') ? true: false,
      registerHidden: localStorage.getItem('registerHidden') ? true: false,
      welcomeHidden: localStorage.getItem('welcomeHidden') ? false: true,      
      logOutHidden: localStorage.getItem('logOutHidden') ? false: true,
      adminAddMovieHidden: localStorage.getItem('adminAddMovieHidden') ? false: true,
      adminEditMovieHidden: localStorage.getItem('adminEditMovieHidden') ? false: true,
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
  /* Clears the local storage cache */
  clearStorage(e) {
    localStorage.clear();
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

  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
    const signedInUser = localStorage.getItem('signedInUser');
    this.setState({signedInUser});
 
  }

  /* Function that runs when register form is submitted.
     Makes the Axios call and does what it needs to based on 
     the response from the .php page*/
  onSubmitRegister(e) {
    e.preventDefault();
    this.setState({
      alertvisible: false
    });
    //if the username is blank, show an error
    if(this.state.username === "")
    {
      this.setState({
        alerttext: "Username field blank. Please try again.",
        alertvisible: true,
        password: "",
        passwordconfirm: ""
      });
      return;
    }
    //if the email is blank, show an error
    if(this.state.email === "")
    {
      this.setState({
        alerttext: "Email field blank. Please try again.",
        alertvisible: true,
        password: "",
        passwordconfirm: ""
      });
      return;
    }
    //if the password is blank, show an error
    if(this.state.password === "")
    {
      this.setState({
        alerttext: "Password field blank. Please try again.",
        alertvisible: true,
        password: "",
        passwordconfirm: ""
      });
      return;
    }    
    //if the password and password confirm don't match, show an error
    if(this.state.password !== this.state.passwordconfirm)
    {
      this.setState({
        alerttext: "Password not confirmed. Please try again.",
        alertvisible: true,
        password: "",
        passwordconfirm: ""
      });
      return;
    }    
    // if none of the other errors showed and the passwords match up, 
    if(this.state.password === this.state.passwordconfirm)
    {
      //create the object to send to the php page
    const reg = {
      regusername: this.state.username,
      regemail: this.state.email,
      regpassword: this.state.password,
      regpasswordconfirm: this.state.passwordconfirm
    };
    /* axios call to the register.php page 
    https://cors-anywhere.herokuapp.com/ is used for testing but isn't used when hosted since the hosting and database
    are in the same location
    */
    Axios
     .post("https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/register", reg)
     .then(response => {    
       console.log(response.data.message);
       console.log(response.data.username);  
       if (response.data.username === "false")
       {
        this.setState({
          alerttext: response.data.message,
          alertvisible: true,
          username: "",
          email: "",
          password: "",
          passwordconfirm: ""
        }); 
        return;
       }
        // set localstorage on successful register
        localStorage.setItem('signedInUser', response.data.username);
        localStorage.setItem('signInHidden', true);
        localStorage.setItem('registerHidden', true);
        localStorage.setItem('welcomeHidden', false);
        localStorage.setItem('logOutHidden', false);
         this.setState({     
                    signedInUser: response.data.username,           
                    signInHidden: true,
                    registerHidden: true,
                    welcomeHidden: false,
                    logOutHidden: false
                    }); 
                    this.toggleModal("register");
                    window.location.reload(false);
   })
     .catch(error => {
      console.log(error); 
      this.setState({
       alerttext: error.data,
       alertvisible: true,
       username: "",
       email: "",
       password: "",
       passwordconfirm: ""
     }); 
  })
  }
}

/* Function that runs when the sign-in form is submitted
   Makes the Axios call and upon success hides the buttons in the nav bar
   for register/sign-in and replaces it with the username welcome text
   https://cors-anywhere.herokuapp.com/ is used for testing but isn't used when hosted since the hosting and database
   are in the same location
    */
onSignIn(e) {
  e.preventDefault();
  // if the username field is blank, throw an error and return
  if(this.state.username === "")
    {
      this.setState({
        alerttext: "Username field blank. Please try again.",
        alertvisible: true,
        password: "",
        passwordconfirm: ""
      });
      return;
    }
    // if the password field is blank throw an error and return
    if(this.state.password === "")
    {
      this.setState({
        alerttext: "Password field blank. Please try again.",
        alertvisible: true,
        password: "",
        passwordconfirm: ""
      });
      return;
    }
  const signin = {
    signinname: this.state.username,
    signinpassword: this.state.password
  };
  /* https://cors-anywhere.herokuapp.com/ */
  Axios
   .post("https://cors-anywhere.herokuapp.com/http://thomasjohnoleary.com/notimdb/signin", signin)
   .then(result => {
    // set localstorage on successful sign in
    localStorage.setItem('signedInUser', result.data);
    localStorage.setItem('signInHidden', true);
    localStorage.setItem('registerHidden', true);
    localStorage.setItem('welcomeHidden', false);
    localStorage.setItem('logOutHidden', false);
     this.setState({     
                signedInUser: result.data,           
                signInHidden: true,
                registerHidden: true,
                welcomeHidden: false,
                logOutHidden: false
                }); 
    // if the signed in user is an admin show the add movie button
    if (this.state.signedInUser === 'admin')
    {
      localStorage.setItem('adminAddMovieHidden', false);
      localStorage.setItem('adminEditMovieHidden', false);
      this.setState({
        adminAddMovieHidden: false,
        adminEditMovieHidden: false
      });
    }
    //close the modal after a successful sign in
    this.toggleModal("signin");  
    window.location.reload(false); 
 })
  //if the sign in fails throw an error message
   .catch(error => {
   console.log(error); 
   this.setState({                
                alerttext: "Invalid username or password",
                alertvisible:"true"
                });
   }) 
}

  //template function
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
  //template function
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  //template function
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  //template function
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  //template function
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
            <Nav>
              <Row>
              <Col className="collapse-brand" xs="6">
              <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title="Designed and Coded by Creative Tim"
              tag={Link}
            >              
              I Can't Believe It's Not IMDB
            </NavbarBrand>
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
              </Nav>
            </div>
            <Nav navbar>              
              <NavItem hidden={this.state.registerHidden}>               
                <NavLink                                     
                onClick={() => this.toggleModal("register")}
                 >
                Register
                </NavLink>              
              </NavItem>
              <NavItem hidden={this.state.signInHidden}>
              <NavLink                                     
                onClick={() => this.toggleModal("signin")}
                 >
                Sign In
                </NavLink>
             
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
              <NavItem hidden={this.state.welcomeHidden}>
            <span className="navbar-text">
              Welcome, {this.state.signedInUser}!
            </span>
          </NavItem>
          <NavItem hidden={this.state.adminAddMovieHidden}>
                <NavLink                   
                  to="add-movie"
              rel="noopener noreferrer"
              title="Add Movie"
              tag={Link}
                >
                Add Movie
                </NavLink>              
            </NavItem>
            <NavItem hidden={this.state.adminEditMovieHidden}>
                <NavLink                   
                  to="edit-movie"
              rel="noopener noreferrer"
              title="Edit a Movie"
              tag={Link}
                >
                Edit a Movie
                </NavLink>              
            </NavItem>
          <NavItem hidden={this.state.logOutHidden}>
                <NavLink
                  onClick={() => this.clearStorage()}
                  to="/"
              rel="noopener noreferrer"
              title="I Can't Believe it's not IMDB"
              tag={Link}
                >
                  Log Out
                </NavLink>              
            </NavItem>           
            </Nav>
          </Collapse>          
        </Container>
      </Navbar>
      
    );
  }
}

export default ComponentsNavbar;
