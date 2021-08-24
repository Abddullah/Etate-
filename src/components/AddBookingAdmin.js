import React, { Component, } from 'react';
// import { Layout, Menu, Breadcrumb,Row, Col, } from 'antd';
import {
  Navbar, Nav, Button, Form, FormControl, Row, Col, Container,
  Layout, NavDropdown, Card, Jumbotron, ListGroup, Dropdown, DropdownButton
} from 'react-bootstrap';
import AppHeader from './common/AppHeader';
import LargeList from './common/largeList';
import BreadCrum from './common/BreadCrum';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import Select from 'react-select';
import { connect } from "react-redux";
import ActivityIndicator from './common/ActivityIndicator';
import { errorCall, loaderCall, createAdmininstrator } from '../store/action/action';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Input from './common/input';
import en from 'react-phone-number-input/locale/en.json'
import PhoneInput, { getCountryCallingCode, getCountries } from 'react-phone-number-input'

// const { Header, Footer, Sider, Content } = Layout;

const options = [
  { value: 'action', label: 'action' },
  { value: 'another action', label: 'another action' },
];
class AddBookingAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1: true,
      // options: [],
      myDoctorsInComponent: "", selectedDoctorList: [], selectedDoctor: "",
      fullName: "", MobileNumber: "", email: "", password: "", country: ""
    };
  }


  handleSwitchChange = nr => () => {
    let switchNumber = `switch${nr}`;
    this.setState({
      [switchNumber]: !this.state[switchNumber]
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps,"***///*")
    let myDoctorsClone = nextProps.myDoctors
    let myAdmininstrators = nextProps.myAdmininstrators
    myDoctorsClone&&myDoctorsClone.map((v, i) => {
      myDoctorsClone[i].label = v.fullName
      myDoctorsClone[i].value = v.fullName
    })
    // this.setState({
    //   myDoctorsInComponent: myDoctorsClone,myAdmininstrators
    // })
    if (nextProps.currentUser) {
      this.setState({
        myDoctorsInComponent: myDoctorsClone,myAdmininstrators,
        abbr: nextProps.currentUser.country,
        country: nextProps.currentUser.country.abbr,
      })
    }
  }
  componentDidMount() {
    const { currentUser } = this.props
    let myDoctorsClone = this.props.myDoctors
    let myAdmininstrators = this.props.myAdmininstrators
    myDoctorsClone&&myDoctorsClone.map((v, i) => {
      myDoctorsClone[i].label = v.fullName
      myDoctorsClone[i].value = v.fullName
    })
    // this.setState({
    //   myDoctorsInComponent: myDoctorsClone,myAdmininstrators
    // })
    if (currentUser) {
      this.setState({
        myDoctorsInComponent: myDoctorsClone,myAdmininstrators,
        abbr: this.props.currentUser.country,
        country: this.props.currentUser.country.abbr,
      })
    }
  }
  addDoctor() {
    let selectedDoctorListClone = this.state.selectedDoctorList
    let selectedDoctor = this.state.selectedDoctor
    let myDoctorsInComponentClone = this.state.myDoctorsInComponent
    if (myDoctorsInComponentClone.length > 0) {
      selectedDoctorListClone.push(selectedDoctor)
      console.log(myDoctorsInComponentClone, selectedDoctor, "ppppp")
      for (var i = 0; i < myDoctorsInComponentClone.length; i++) {
        if (myDoctorsInComponentClone[i].DoctorId === selectedDoctor.DoctorId) {
          myDoctorsInComponentClone.splice(i, 1)
        }
      }
      this.setState({
        myDoctorsInComponent: myDoctorsInComponentClone,
        selectedDoctorList: selectedDoctorListClone
      }, () => { console.log(this.state.myDoctorsInComponent, this.state.selectedDoctorList, "ppppp") })
    }
  }
  removeDoctor(v, i) {
    let selectedDoctorListClone = this.state.selectedDoctorList
    let myDoctorsInComponentClone = this.state.myDoctorsInComponent
    selectedDoctorListClone.splice(i, 1)
    myDoctorsInComponentClone.push(v)
    this.setState({
      myDoctorsInComponent: myDoctorsInComponentClone,
      selectedDoctorList: selectedDoctorListClone
    }, () => { console.log(this.state.myDoctorsInComponent, this.state.selectedDoctorList, "ppppp") })
  }


  createAdmininstrator() {
    const { fullName, MobileNumber, email, password, myDoctorsInComponent, selectedDoctorList
    } = this.state
    console.log("start",
      fullName, MobileNumber, email, password, myDoctorsInComponent, "close",
    )
    if (selectedDoctorList.length > 0) {

      let validateOpt = {
        fullName, MobileNumber, email, password,selectedDoctorList
      }
      let validate = true
      console.log(validateOpt, "validateOpt")
      for (var key in validateOpt) {
        if (validateOpt[key] === "") {
          this.props.loaderCall()

          // alert(key + " is required")
          validate = false
          this.props.errorCall(key + " is required")
          break
        }
      }
      if (validate) {
        this.props.createAdmininstrator(validateOpt)
      }
    }
    else {
      this.props.loaderCall()
      this.props.errorCall("Create doctor first")
    }
  }
  render() {
    const { isLoader, isError, errorMessage, myDoctors,currentUser } = this.props
    const { myDoctorsInComponent, selectedDoctorList, selectedDoctor,myAdmininstrators } = this.state
    // console.log(myClinics,"myClinicsmyClinics")
    console.log(myDoctors, "render")
    return (
      <div style={{ backgroundColor: "#fff", }}>
        <AppHeader />
        <BreadCrum color="Booking administrator"/>


        {/* <center> */}
        {/* </body> */}
        <div style={{ display: "flex", flexBasis: "100%", marginTop: "3%", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flexBasis: "40%", justifyContent: "center", display: "flex", borderRight: "2px solid", borderRightColor: "#F4F6FA", }}>
            <LargeList heading="Administrator name" data={myAdmininstrators} deleteIcon="trash-alt" collection="admininstrators" />
          </div>
          <div style={{ flexBasis: "60%", }}>

            <div style={{
              display: "flex", justifyContent: "center"
            }}
            >
              <div style={{

                borderRadius: 10,
              }} >
                <Form style={{}}>

                  <Input label="Full name" type="text" placeholder="Full name" func={(v) => { this.setState({ fullName: v }) }} />
                  
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} style={{ display: "flex", alignItems: "center", fontSize: 13, fontWeight: "bold" }}>
                    {"Mobile number"}
                  </Form.Label>
                  <Col sm={8}>
                    {
                      currentUser && this.state.abbr &&
                      <select
                        style={{ width: 210, padding: 7, borderRadius: 5, marginTop: 10 }}
                        value={this.state.country}
                        onChange={event => this.setState({ country: event.target.value })}>
                        <option value="">
                          {en[this.state.abbr.abbr]} +{getCountryCallingCode(this.state.abbr.abbr)}
                        </option>
                        {getCountries().map((country) => (
                          <option key={country} value={country}>
                            {en[country]} +{getCountryCallingCode(country)}
                          </option>
                        ))}
                      </select>
                    }
                    <Form.Control
                      type="number" placeholder="Mobile number"
                      style={{ marginTop: 15 }}
                      onChange={(e) => { this.setState({ MobileNumber: "+" + getCountryCallingCode(this.state.country) + e.target.value }) }} />
                  </Col>
                </Form.Group>
                  {/* <Input label="Mobile number" type="number" placeholder="Mobile number" func={(v) => { this.setState({ MobileNumber: v }) }} /> */}
                  <Input label="Email" type="text" placeholder="Email" func={(v) => { this.setState({ email: v }) }} />
                  <Input label="Password" type="password" placeholder="Password" func={(v) => { this.setState({ password: v }) }} />
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                      <MDBIcon icon="plus" style={{ color: "#3D69B2" }}
                        onClick={() => this.addDoctor()}
                      />
                    </Form.Label>
                    <Col sm={8}>
                      <Select
                        placeholder="Add doctor"
                        value={selectedDoctor}
                        onChange={(value) => this.setState({ selectedDoctor: value })}
                        options={myDoctorsInComponent}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div style={{ flexBasis: "40%", justifyContent: "center", display: "flex", borderRight: "2px solid", borderRightColor: "#F4F6FA", }}>
              {/* <div  style={{ flexDirection:"r"}}>

            </div> */}
              <div style={{ background: "#F0F0F0", height: '260px', padding: "1%" }}>
                <h3 style={{ fontWeight: "bold", display: "flex", justifyContent: "center" }}>
                  Doctors name:
              </h3>
                <div style={{ height: '200px', background: "#F0F0F0", overflowX: 'scroll', }} >
                  <ListGroup>
                    {selectedDoctorList.map((v, i) => {
                      return (
                        <>
                          <ListGroup.Item style={{
                            webkitBoxShadow: "3px 3px 3px #9E9E9E",
                            mozBoxShadow: "3px 3px 3px #9E9E9E",
                            boxShadow: "3px 3px 3px #9E9E9E", flexDirection: "row", display: "flex", width: 300, alignItems: "center"
                          }}>

                            <div style={{ display: "flex", alignItems: "center" }}>
                              <img style={{ width: 50, }} src={v.doctorImage} alt="aaaa" />
                            </div>
                            <div style={{ marginLeft: 10 }}>
                              <div style={{ fontSize: 12, fontWeight: "bold", color: "#8C8888" }}>
                                {v.fullName}
                              </div>
                              <div style={{ fontSize: 11, color: "#8C8888" }}>
                                {v.bussinesAddress}
                              </div>
                            </div>
                            <div style={{ justifyContent: "flex-end", display: "flex", position: "absolute", right: 10 }}>
                              <MDBIcon far icon="trash-alt"
                                onClick={() => this.removeDoctor(v, i)}
                              />
                            </div>

                          </ListGroup.Item>
                        </>
                      )
                    })}
                  </ListGroup>
                </div>
                {/* <div className style={{}}>
                  <Button variant="link">Back</Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* </footer step butons> */}
        <div className="float-right" style={{ justifyContent: "flex-end", display: "flex", padding: "5%" }}>
          {isError && <div><span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span></div>}
          {isLoader ?
            <Button variant="primary">
              <ActivityIndicator />
            </Button> :
            <Button onClick={() => this.createAdmininstrator()} variant="primary">Add</Button>
          }
        <Link to="/pricing"><Button variant="primary">Next</Button></Link>
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
    myAdmininstrators: state.root.myAdmininstrators,
    currentUser: state.root.currentUser,
    myDoctors: state.root.myDoctors,

  };
};
function mapDispatchToProps(dispatch) {
  return ({

    createAdmininstrator: (admininstrator) => {
      dispatch(createAdmininstrator(admininstrator)
      )
    },
    errorCall: (errorMessage) => {
      dispatch(errorCall(errorMessage)
      )
    },
    loaderCall: () => {
      dispatch(loaderCall()
      )
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookingAdmin);


