import React, { Component, } from 'react';
// import { Layout, Menu, Breadcrumb,Row, Col, } from 'antd';
import { Navbar, Nav, Button, Form, FormControl, Row, Col, Container, Layout, NavDropdown, Card, Jumbotron, DropdownButton, Dropdown } from 'react-bootstrap';
import AppHeader from './common/AppHeader';
import BreadCrum from './common/BreadCrum';
import Input from './common/input';
import Select from 'react-select';
import { connect } from "react-redux";
import ActivityIndicator from './common/ActivityIndicator';
import { errorCall, loaderCall, createDoctor } from '../store/action/action';
import styles from './style.css';
import { FaLevelUpAlt, FaAngleDoubleRight, FaMapMarkerAlt, FaPhone, } from 'react-icons/fa';
import LargeList from './common/largeList';
import *as firebase from 'firebase';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import en from 'react-phone-number-input/locale/en.json'
import PhoneInput, { getCountryCallingCode, getCountries } from 'react-phone-number-input'

// const { Header, Footer, Sider, Content } = Layout;

const options = [
  { value: 'action', label: 'action' },
  { value: 'another action', label: 'another action' },
];
class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1: true, doctorImage: "", etateId: "", fullName: "", otherName: "", MobileNumber: "", email: "", password: "", bussinesAddress: "", specialist: "",
      country: ""

    };
  }

  image(file) {
    const { loaderCall } = this.props

    loaderCall()

    if (file) {
      firebase.storage().ref(`pictures/${file.name}`).put(file).then((res) => {
        console.log(res, "-------")
        firebase.storage().ref(`pictures/${file.name}`).getDownloadURL().then((res) => {
          console.log(res, "9999")
          this.setState({
            doctorImage: res
          })
          loaderCall()

        })
      })
    }






    // var reader = new FileReader();
    // reader.onloadend = () => {
    //   this.setState({ doctorImage: reader.result })
    //   console.log(reader.result, 'result here')
    // }
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  }
  createDoctor() {
    const { doctorImage, etateId, fullName, otherName, MobileNumber, email, password, bussinesAddress, specialist
    } = this.state
    console.log("start",
      doctorImage, etateId, fullName, otherName, MobileNumber, email, password, bussinesAddress, specialist, "close",
    )
    let validateOpt = {
      doctorImage, etateId, fullName, otherName, MobileNumber, email, password,
      bussinesAddress: bussinesAddress.value, specialist: specialist.value,
    }
    let validate = true
    console.log(validateOpt, "validateOpt")
    for (var key in validateOpt) {
      if (validateOpt[key] === "") {
        this.props.loaderCall()
        validate = false
        this.props.errorCall(key + " is required")
        break
      }
    }

    if (validate) {
      this.props.createDoctor(validateOpt)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState({
        myDoctorsInComponent: nextProps.myDoctors,
        abbr: nextProps.currentUser.country,
        country: nextProps.currentUser.country.abbr,
      })
    }


  }
  componentDidMount() {
    const { currentUser } = this.props
    if (currentUser) {
      this.setState({
        myDoctorsInComponent: this.props.myDoctors,
        abbr: this.props.currentUser.country,
        country: this.props.currentUser.country.abbr,
      })
    }
  }
  render() {
    const { isLoader, isError, errorMessage,currentUser } = this.props
    const { myDoctorsInComponent } = this.state
    return (
      <div>
        <AppHeader />
        <BreadCrum color="Doctors" />

        <div style={{ display: "flex", flexBasis: "100%", marginTop: "3%", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flexBasis: "40%", justifyContent: "center", display: "flex", borderRight: "2px solid", borderRightColor: "#F4F6FA", }}>
            <LargeList heading="Doctors name" data={myDoctorsInComponent} deleteIcon="trash-alt" collection="doctors" />
          </div>
          <div style={{ flexBasis: "60%", }}>
            <div style={{}}>
              {/* {
                this.state.doctorImage ?
                  <img width="10%" style={{ minWidth: 150 }} src={this.state.doctorImage} /> :
                  <img width="10%" style={{ minWidth: 150 }} src={require('../assets/default.png')} />
              } */}
              {(isLoader) ?
                // <Button  variant="primary">
                <div style={{ minWidth: 150, padding: 50 }}>

                  <ActivityIndicator colorOfLoader="grey" style={{}} />
                </div>
                // </Button> :
                // <Button onClick={() => this.createDoctor()} variant="primary">Add</Button>
                :
                this.state.doctorImage ?
                  <img width="10%" style={{ minWidth: 150 }} src={this.state.doctorImage} /> :
                  <img width="10%" style={{ minWidth: 150 }} src={require('../assets/default.png')} />
              }
            </div>
            <div style={{
              display: "flex", justifyContent: "center", borderBottom: "2px solid #F0F0F0",
            }}>

              <Form style={{ width: 400 }}>
                <Form.Group as={Row} controlId="formHorizontalEmail" style={{ padding: 15 }}>
                  <div className="custom-file" >
                    <input
                      onChange={(e) => this.image(e.target.files[0])}
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                      Upload a photo of the doctor
                    </label>
                  </div>
                </Form.Group>

                <Input label="Etat ID" type="text" placeholder="Etat ID" func={(v) => { this.setState({ etateId: v }) }} />
                <Input label="Full name" type="text" placeholder="Full name" func={(v) => { this.setState({ fullName: v }) }} />
                <Input label="Other name" type="text" placeholder="Other name" func={(v) => { this.setState({ otherName: v }) }} />
                <Form.Group as={Row} controlId="formHorizontalEmail">
                
                  <Form.Label column sm={4} style={{ display: "flex", alignItems: "center", fontSize: 13, fontWeight: "bold" }}>
                    {"Mobile number"}
                  </Form.Label>
                  <Col sm={8}>
                    {
                      currentUser && this.state.abbr &&
                      <select
                        style={{ width: 255, padding: 7, borderRadius: 5, marginTop: 10 }}
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
                <Input label="Email" type="email" placeholder="Email" func={(v) => { this.setState({ email: v }) }} />
                <Input label="Password" type="password" placeholder="password" func={(v) => { this.setState({ password: v }) }} />
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} style={{fontSize:13,fontWeight:"bold"}}>
                    Bussines address
                         </Form.Label>
                  <Col sm={8}>
                    <Select
                      value={this.state.bussinesAddress}
                      onChange={(value) => this.setState({ bussinesAddress: value })}
                      options={options}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4} style={{fontSize:13,fontWeight:"bold"}}>
                    Specialist
                         </Form.Label>
                  <Col sm={8}>
                    <Select
                      value={this.state.specialist}
                      onChange={(value) => this.setState({ specialist: value })}
                      options={options}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
        <div className="float-right" style={{ justifyContent: "flex-end", display: "flex", padding: "5%" }}>
          {isError && <div><span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span></div>}
          {isLoader ?
            <Button variant="primary">
              <ActivityIndicator />
            </Button> :
            <Button onClick={() => this.createDoctor()} variant="primary">Add</Button>
          }
          <Link to="/AddBookingAdmin">

            <Button variant="primary">Next</Button>
          </Link>
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
    myDoctors: state.root.myDoctors,
    //   errorInStore: state.root.error,
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    errorCall: (errorMessage) => {
      dispatch(errorCall(errorMessage)
      )
    },
    loaderCall: () => {
      dispatch(loaderCall()
      )
    },
    createDoctor: (doctor) => {
      dispatch(createDoctor(doctor)
      )
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDoctor);


