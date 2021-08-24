import React, { Component, } from 'react';
// import { Layout, Menu, Breadcrumb,Row, Col, } from 'antd';
import { Navbar, Nav, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
// import { Form,FormControl} from 'bootstrap';
// const { Header, Footer, Sider, Content } = Layout;
import *as firebase from 'firebase';
import { connect } from "react-redux";
import { logout, } from '../../store/action/action';
import { languageSet } from '../../store/action/language';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }
  logout() {
    this.props.logout()
  }
  languageSet(language) {
    this.props.languageSet(language)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState({
        user: nextProps.currentUser
      })
    }

  }
  componentDidMount() {
    const { currentUser } = this.props

    if (currentUser) {
      this.setState({
        user: currentUser
      })
    }
  }
  render() {
    const { login, button, currentUser, str } = this.props
    console.log(str, "STRRR")

    const { user } = this.state
    return (
      <div style={{}}>
        <Navbar style={{}} expand="lg">
          <Navbar.Brand href="#home" className="mr-auto" >
            <div style={{ marginLeft: "15%", }}>
              <img style={{ width: "100%", }} src={require('../../assets/updatedLogo.png')} alt="aaaa" />

              <DropdownButton
                title={"Language"}
                variant={"Secondary"}
                id={`dropdown-variants-Secondary`}
                key={"Secondary"}
              >
                <Dropdown.Item eventKey="5" onClick={() => this.languageSet("EN")}>EN</Dropdown.Item>
              </DropdownButton>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" >
            </Nav>
            <Form inline>
              <Nav className="mr-auto" >
                <Nav.Link href="landingPage#whyChooseUs" style={{ color: "black", fontWeight: "bold" }}>{str.Whychooseus}</Nav.Link>
                <Nav.Link href="landingPage#HowItWorks" style={{ color: "black", fontWeight: "bold" }}>{str.Howitworks}</Nav.Link>
                <Nav.Link href="pricing" style={{ color: "black", fontWeight: "bold" }}>{str.Pricing}</Nav.Link>
                <Nav.Link href={(currentUser || user) ? "/" : "Login"} style={{ color: "#285BAC", fontWeight: "bold" }}>{(currentUser || user) ? null : str.login}</Nav.Link>
                {(currentUser || user) && <DropdownButton
                  title={"Profile"}
                  variant={"Secondary"}
                  id={`dropdown-variants-Secondary`}
                  key={"Secondary"}
                >
                  <Dropdown.Item eventKey="1" ><Link to="/home">{str.Myaccount}</Link></Dropdown.Item>
                  <Dropdown.Item eventKey="2" ><Link to="/MyClinics">{str.Myclinincs}</Link></Dropdown.Item>
                  <Dropdown.Item eventKey="3" ><Link to="/MyDoctors">{str.Mydoctors}</Link></Dropdown.Item>
                  <Dropdown.Item eventKey="4" ><Link to="/test">{str.Mypayment}</Link></Dropdown.Item>
                  {/* <Dropdown.Item eventKey="3"href="/MyDoctors">My doctors</Dropdown.Item>
                        <Dropdown.Item eventKey="4"href="/pricing">My payment</Dropdown.Item> */}
                  <Dropdown.Item eventKey="5" onClick={() => this.logout()}>{str.Logout}</Dropdown.Item>
                </DropdownButton>}
              </Nav>
              {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
              {(currentUser || user) ? null : (<Link to={"signup"}><Button variant="outline-primary">{str.signup}</Button></Link>)}

            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ background: "#F0F3F1", }}>
          {/* <hr /> */}
        </div>
      </div>

    )
  }
}

let mapStateToProps = state => {
  return {
    isLoader: state.root.isLoader,
    isError: state.root.isError,
    errorMessage: state.root.errorMessage,
    currentUser: state.root.currentUser,
    str: state.root.str,
    //   errorInStore: state.root.error,
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    logout: () => {
      dispatch(logout())
    },
    languageSet: (code) => {
      dispatch(languageSet(code))
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);

