import React, { Component, } from 'react';
// import { Layout, Menu, Breadcrumb,Row, Col, } from 'antd';
import { Navbar, Nav, Button, Form, FormControl, Row, Col, Container, Layout, NavDropdown, Card, Jumbotron } from 'react-bootstrap';
import AppHeader from './common/AppHeader';
import HowItWorks from './HowItWorks';
// import {} from 'bootstrap';
// import { ButtonToolbar,DropdownButton,Dropdown , Navbar,Nav,NavDropdown} from 'react-bootstrap';
import styles from './style.css';
import { FaLevelUpAlt, FaAngleDoubleRight, FaMapMarkerAlt, FaPhone, } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import ActivityIndicator from './common/ActivityIndicator';
import { connect } from "react-redux";
import { buyPackage, payment, signUpAction } from '../store/action/action';

// import { buyPackage,payment } from '../store/action/action';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';
import en from 'react-phone-number-input/locale/en.json'
import PhoneInput, { getCountryCallingCode, getCountries } from 'react-phone-number-input'
const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({ attributeMode: false });
// const { Header, Footer, Sider, Content } = Layout;

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { fullName: "", email: "", password: "", confirmPassword: "", phone: "", country: "" };
    }
    handleSwitchChange = nr => () => {
        let switchNumber = `switch${nr}`;
        this.setState({
            [switchNumber]: !this.state[switchNumber]
        });
    }
    componentWillMount() {
        axios.get('http://api.hostip.info')
            .then((response) => {
                console.log("ip config", response.data);
                parser.xmlToJson(response.data, (err, json) => {
                    if (err) {
                        console.log(err, "jserrerroerrnjsonjson")
                    }
                    console.log(json, "jserrerronjsonjson")

                    let country = {}
                    country.country = json.HostipLookupResultSet[`gml:featureMember`].Hostip.countryName
                    country.abbr = json.HostipLookupResultSet[`gml:featureMember`].Hostip.countryAbbrev
                    console.log(country, "ney", country.abbr)
                    this.setState({
                        country: country.abbr,
                        abbr: country,
                    })
                });
            })
            .catch(function (error) {
                console.log("error", error);
            });
    }
    buy(cart) {
        this.props.buyPackage(cart)
    }
    render() {
        const { fullName, email, password, confirmPassword, phone, country } = this.state
        const { isLoader, isError, errorMessage, currentUser, str } = this.props
        let user = { fullName, email, phone, password, confirmPassword, status: false }
        console.log(country, "countrycountrycountry")
        return (
            <div style={{ backgroundColor: "#fff", }}>
                <AppHeader login={true} button="Signup" />

                <div style={{ position: "relative" }}>
                    <img style={{ width: "100%", height: 550, }} src={require('../assets/image1b.jpg')} alt="aaaa" />
                    {!currentUser &&
                        <div style={{
                            position: "absolute",
                            top: 45,
                            right: 100,
                            // width: "100%",
                        }}>
                            {/* signup form */}
                            <div style={{
                                backgroundColor: "#fff", width: 340, padding: "5%", marginTop: "3%",
                                // borderRadius: 10,
                                webkitBoxShadow: "3px 3px 3px #9E9E9E",
                                mozBoxShadow: "3px 3px 3px #9E9E9E",
                                boxShadow: "3px 3px 3px #9E9E9E",
                                height: 440
                            }}>
                                <center>
                                    <div style={{ fontWeight: "bold", marginTop: 10 }}>
                                        {str.Registerinsecond}
                                    </div>
                                    <Form style={{ width: "80%", marginTop: "2%" }}>
                                        <Form.Control style={{ marginTop: 10, height: 35 }} defaultValue={fullName} onChange={(e) => { this.setState({ fullName: e.target.value }) }}
                                            type="text" placeholder={str.Fullname} />
                                        <Form.Control style={{ marginTop: 10, height: 35 }} defaultValue={email} onChange={(e) => { this.setState({ email: e.target.value }) }}
                                            type="email" placeholder={str.Enteremail} />


                                        {country &&
                                            <select style={{ width: 245, padding: 5, borderRadius: 5, marginTop: 10 }}
                                                value={country}
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

                                        <Form.Control style={{ marginTop: 10, height: 35 }} defaultValue={phone}
                                            // onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                            onChange={(e) => { this.setState({ phone: "+" + getCountryCallingCode(this.state.country) + e.target.value }) }}

                                            type="number" placeholder={str.Enterphone} />
                                        <Form.Control style={{ marginTop: 10, height: 35 }} defaultValue={password} onChange={(e) => { this.setState({ password: e.target.value }) }}
                                            type="password" placeholder={str.Enterpassword} />
                                        <Form.Control style={{ marginTop: 10, height: 35 }} defaultValue={confirmPassword} onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }}
                                            type="password" placeholder={str.Confirmpassword} />
                                    </Form>
                                    {isLoader ?
                                        <Button style={{ width: 255, fontSize: 11, marginTop: "3%" }} variant="primary" disabled={true}>
                                            <ActivityIndicator />
                                        </Button> :
                                        <Button onClick={() => { this.props.signUpAction(user) }} style={{ width: 255, fontSize: 11, marginTop: "3%" }} variant="primary" > {str.Createyouraccount}</Button>
                                    }
                                    <div>
                                        {str.or}<Link to="/login"> <span> {str.login}?</span></Link>
                                        {/* <span>Already hav an account? </span> */}
                                    </div>
                                    <div style={{ fontSize: 12 }}>
                                        {str.Bysigningupyouagreetothe}<a href="#"> <span>{str.Termsofservices} </span></a>
                                        {/* <span>Already hav an account? </span> */}
                                    </div>
                                    {isError && <div><span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span></div>}
                                </center>
                            </div>





                        </div>}
                </div>




                {/* </div> */}
                {/* Why choose us*/}
                <div style={{}} >
                    <center style={{ fontSize: 25, fontWeight: "bold", }} id="whyChooseUs">
                        {str.Whychooseus}
                    </center>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} >
                        <div style={{ marginRight: 25, marginTop: "2%", justifyContent: "center", display: "flex" }}>

                            <div style={{ width: 350, }}>
                                <img style={{ width: 350, }} src={require("../assets/whychooseus.png")} alt="aaaa" />
                                {/* </div> */}
                            </div>
                        </div>
                        <div style={{ marginLeft: 25, marginTop: "2%", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                            {/* <div style={{  background: "#285BAC",  width: 350, }}>

                        <div style={{  background: "pink", }}>
                            Why choos us
                        </div> */}
                            <div style={{ width: 500, }}>
                                <div style={{}}>
                                    {str.Loremipsum}
                                    {str.Loremipsum}
                                </div>
                                <Button variant="outline-primary">{str.ReadMore}</Button>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    {/* How it works*/}
                    <center style={{ fontSize: 25, fontWeight: "bold", marginTop: "2%" }} id="HowItWorks">
                        {str.Howitworks}
                    </center>
                    <HowItWorks />

                    {/* pricing */}
                    <center style={{ fontSize: 25, fontWeight: "bold", marginTop: "2%" }} id="Pricing">
                        {str.Pricing}
                    </center>
                    <center>
                        <div style={{ display: "flex", flexBasis: "100%", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }} id="2">
                            <div style={{ width: '15rem', paddingTop: "2%", paddingBottom: "2%", marginLeft: "2%", marginTop: "2%" }}>
                                <div>
                                    <div style={{ color: "#285BAC", fontSize: 25 }}>{str.twomonthsfre}</div>
                                    <div style={{ color: "#285BAC", fontSize: 17 }}>{str.ifyoupaidanually}</div>
                                    <div style={{ marginTop: "10%" }}>
                                        {str.freetrial}
                                    </div>
                                    <div style={{ marginTop: "5%" }}>
                                        {str.fiftypercentdiscount}
                                    </div>
                                    <div style={{ marginTop: "5%" }}>
                                        {str.numberofdoctors}
                                    </div>
                                    {/* <Button style={{ background: "#3C6AB3", borderRadius: 250, borderColor: "#3C6AB3", marginTop: "10%" ,fontWeight:"bold"}} variant="primary">Buy Now</Button> */}
                                </div>
                            </div>

                            <div style={{ width: '15rem', paddingTop: "2%", paddingBottom: "2%", marginLeft: "2%", marginTop: "2%" }}>
                                <div>
                                    <div style={{ color: "#285BAC", fontSize: 25 }}>{str.SoloClinic}</div>
                                    <div style={{ color: "#285BAC", fontSize: 17 }}>{str.seventydollermonth}</div>
                                    <div style={{ marginTop: "10%" }}>
                                        {str.sixtydays}
                                    </div>
                                    <div style={{ marginTop: "5%" }}>
                                        {str.sixtydays}
                                    </div>
                                    <div style={{ marginTop: "5%" }}>
                                        {str.one}
                                    </div>
                                    <Button
                                        onClick={() => { this.buy({ package: "Solo clinic", price: "75", duration: "60" }) }}
                                        style={{ background: "#3C6AB3", borderRadius: 250, borderColor: "#3C6AB3", marginTop: "10%", fontWeight: "bold" }} variant="primary">{str.BuyNow}</Button>
                                </div>
                            </div>
                            <div style={{ width: '15rem', paddingTop: "2%", paddingBottom: "2%", marginLeft: "2%", marginTop: "2%" }}>
                                <div>
                                    <div style={{ color: "#285BAC", fontSize: 25 }}>{str.SingleClinic}</div>
                                    <div style={{ color: "#285BAC", fontSize: 17 }}>{str.ninetyninedollermonth}</div>
                                    <div style={{ marginTop: "10%" }}>
                                        {str.thertydays}
                                    </div>
                                    <div style={{ marginTop: "5%" }}>
                                        {str.thertydays}
                                    </div>
                                    <div style={{ marginTop: "5%" }}>
                                        {str.four}
                                    </div>
                                    <Button
                                        onClick={() => { this.buy({ package: "Single clinic", price: "99", duration: "30" }) }}
                                        style={{ background: "#3C6AB3", borderRadius: 250, borderColor: "#3C6AB3", marginTop: "10%", fontWeight: "bold" }} variant="primary">{str.BuyNow}</Button>

                                </div>
                            </div>
                            <div style={{ width: '15rem', paddingTop: "2%", paddingBottom: "2%", marginLeft: "2%", marginTop: "2%" }}>
                                <div>
                                    <div style={{ color: "#285BAC", fontSize: 25 }}>{str.MultiClinic}</div>
                                    <div style={{ color: "#285BAC", fontSize: 17 }}>{str.seventydollermonth}h</div>
                                    <div style={{ marginTop: "10%" }}>
                                        {str.thertydays}
                                    </div>
                                    <div style={{ marginTop: "5%" }}>
                                        {str.zerodays}
                                    </div>
                                    <div style={{ marginTop: "5%" }}>
                                        {str.twelve}
                                    </div>
                                    <Button
                                        onClick={() => { this.buy({ package: "Multi clinic", price: "75", duration: "30" }) }}
                                        style={{ background: "#3C6AB3", borderRadius: 250, borderColor: "#3C6AB3", marginTop: "10%", fontWeight: "bold" }} variant="primary">{str.BuyNow}</Button>

                                </div>
                            </div>


                            {/* <Card style={{ width: '15rem', paddingTop: "2%", paddingBottom: "2%", marginLeft: "2%", marginTop: "2%" }}>
                                <Card.Body>
                                    <Card.Title style={{ color: "#285BAC", fontSize: 25 }}>Solo Clinic</Card.Title>
                                    <Card.Title style={{ color: "#285BAC", fontSize: 17 }}>$ 75 / month</Card.Title>
                                    <Card.Text style={{ marginTop: "10%" }}>
                                        60 days
            </Card.Text>
                                    <Card.Text style={{ marginTop: "5%" }}>
                                        60 days
            </Card.Text>
                                    <Card.Text style={{ marginTop: "5%" }}>
                                        1
            </Card.Text>
                                    <Button style={{ background: "#3C6AB3",borderRadius:250, borderColor: "#3C6AB3", marginTop: "10%" }} variant="primary">Buy Now</Button>

                                </Card.Body>
                            </Card><Card style={{ width: '15rem', paddingTop: "2%", paddingBottom: "2%", marginLeft: "2%", marginTop: "2%" }}>
                                <Card.Body>
                                    <Card.Title style={{ color: "#285BAC", fontSize: 25 }}>Single Clinic</Card.Title>
                                    <Card.Title style={{ color: "#285BAC", fontSize: 17 }}>$ 99 / month</Card.Title>
                                    <Card.Text style={{ marginTop: "10%" }}>
                                        30 days
            </Card.Text>
                                    <Card.Text style={{ marginTop: "5%" }}>
                                        30 days
            </Card.Text>
                                    <Card.Text style={{ marginTop: "5%" }}>
                                    4
            </Card.Text>
                                    <Button style={{ background: "#3C6AB3", borderRadius:250,borderColor: "#3C6AB3", marginTop: "10%" }} variant="primary">Buy Now</Button>

                                </Card.Body>
                            </Card><Card style={{ width: '15rem', paddingTop: "2%", paddingBottom: "2%", marginLeft: "2%", marginTop: "2%" }}>
                                <Card.Body>
                                    <Card.Title style={{ color: "#285BAC", fontSize: 25 }}>Multi Clinic</Card.Title>
                                    <Card.Title style={{ color: "#285BAC", fontSize: 17 }}>$ 75 / month</Card.Title>
                                    <Card.Text style={{ marginTop: "10%" }}>
                                    30 days
            </Card.Text>
                                    <Card.Text style={{ marginTop: "5%" }}>
                                        0 days
            </Card.Text>
                                    <Card.Text style={{ marginTop: "5%" }}>
                                        12
            </Card.Text>
                                    <Button style={{ background: "#3C6AB3",borderRadius:250, borderColor: "#3C6AB3", marginTop: "10%" }} variant="primary">Buy Now</Button>
                                </Card.Body>
                            </Card> */}
                        </div>

                    </center>
                    {/* <div style={{ marginLeft: "12%", color: "#3C6AB3", marginTop: "2%", fontSize: 13, display: "flex", justifyContent: "center" }} >
                        You save 17 %
                      </div> */}
                    <div style={{ marginTop: "1%", display: "flex", justifyContent: "center" }}>
                        <div style={{ marginRight: "1%", fontFamily: "Ink free" }} >
                            {str.Monthly}
                        </div>
                        <div className='custom-control custom-switch'>
                            {/* <span >
            Year
        </span> */}
                            <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitches'
                                checked={this.state.switch1}
                                onChange={this.handleSwitchChange(1)}
                                readOnly
                            />
                            <label className='custom-control-label' htmlFor='customSwitches'
                                style={{ fontFamily: "Ink free" }}>
                                {str.Annually}
                                {/* <FaLevelUpAlt style={{ color: "#3C6AB3", fontSize: 22 }} /> */}
                                <span style={{ color: "red" }}> {str.Saveseventeenpercent}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <center style={{}}>

                    <Link to="signup"> <Button style={{ background: "#3C6AB3", borderRadius: 250, borderColor: "#3C6AB3", marginTop: "3%", fontWeight: "bold" }} variant="primary" size="lg">{str.Startfreetrialnow}</Button></Link>
                    <div style={{ color: "red", fontFamily: "Ink free", padding: "0.5%" }}>
                        {str.Nocreditcardneeded}
                    </div>
                </center>
                {/* schedule jomtron */}
                {/* <div style={{ background: "#EEF5FF", padding: "3%" }}>
                    <div style={{ display: "flex", flexBasis: "100%", justifyContent: "center", }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div>

                                Do you need an <span style={{ color: "#3C6AB3" }}>Enterprise solution?</span>
                            </div>
                        </div>
                        <div style={{ marginLeft: "3%" }}>
                            <Button style={{ borderColor: "#3C6AB3", }} variant="outline-primary" size="lg">Schedule a Meeting</Button>
                        </div>
                    </div>
                </div> */}
                {/* footer jomtron */}

                {/* footer jomtron */}

                <div style={{ display: "flex", flexBasis: "100%", justifyContent: "center", background: "#1B1B1B" }}>
                    <div style={{ flexBasis: "20%", padding: "2%" }}>
                        <h6 style={{ color: "#fff", fontWeight: "bold" }}>
                            {str.Aboutus}
                        </h6>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            {str.Loremipsum1}
                        </div>
                    </div>
                    <div style={{ flexBasis: "20%", padding: "2%" }}>
                        <h6 style={{ color: "#fff", fontWeight: "bold" }}>
                            {str.SiteMap}
                        </h6>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            <FaAngleDoubleRight /> {str.Aboutus}
                        </div>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            <FaAngleDoubleRight /> {str.Services}
                        </div>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            <FaAngleDoubleRight /> {str.Testimonials}
                        </div>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            <FaAngleDoubleRight /> {str.Gallery}
                        </div>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            <FaAngleDoubleRight /> {str.Blog}
                        </div>
                    </div>
                    <div style={{ flexBasis: "20%", padding: "2%" }} >
                        <h6 style={{ color: "#fff", fontWeight: "bold" }}>
                            {str.ContactUs}
                        </h6>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            <FaMapMarkerAlt style={{ color: "#47C2C4", }} /> {str.InternationalHousetwevelfConstanceStreetLondonE162DQ}
                        </div>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            <FaPhone style={{ color: "#47C2C4", }} /> {str.numbers}
                        </div>
                        <div style={{ color: "#fff", fontSize: 12 }}>
                            <MdMailOutline style={{ color: "#47C2C4", }} />{str.supportMail}
                        </div>

                    </div>
                    <div style={{ flexBasis: "20%", padding: "2%" }} >
                        <h6 style={{ color: "#fff", fontWeight: "bold" }}>
                            {str.FOLLOWUS}
                        </h6>
                        <div style={{
                            flexDirection: "row", display: "flex", flexWrap: "wrap",
                        }}>

                            <div style={{
                                background: "#fff", borderRadius: "50%",
                                width: 50, justifyContent: "center", display: "flex", alignItems: "center",
                                height: 50, margin: 5
                            }}>
                                <div style={{ color: "#3D69B2" }}>
                                    {/* <a href="#!" className="fb-ic mr-3"> */}
                                    <MDBIcon fab icon="facebook-f" />
                                    {/* </a>/ */}
                                </div>
                            </div>
                            <div style={{
                                background: "#fff", borderRadius: "50%",
                                width: 50, justifyContent: "center", display: "flex", alignItems: "center",
                                height: 50, margin: 5
                            }}>
                                <div style={{ color: "#3D69B2" }}>
                                    {/* <a href="#!" className="fb-ic mr-3"> */}
                                    <MDBIcon fab icon="twitter" />
                                    {/* </a>/ */}
                                </div>
                            </div>
                            <div style={{
                                background: "#fff", borderRadius: "50%",
                                width: 50, justifyContent: "center", display: "flex", alignItems: "center",
                                height: 50, margin: 5
                            }}>
                                <div style={{ color: "#3D69B2" }}>
                                    {/* <a href="#!" className="fb-ic mr-3"> */}
                                    <MDBIcon fab icon="linkedin-in" />
                                    {/* </a>/ */}
                                </div>
                            </div>
                            <div style={{
                                background: "#fff", borderRadius: "50%",
                                width: 50, justifyContent: "center", display: "flex", alignItems: "center",
                                height: 50, margin: 5
                            }}>
                                <div style={{ color: "#3D69B2" }}>
                                    {/* <a href="#!" className="fb-ic mr-3"> */}
                                    <MDBIcon fab icon="google-plus-g" />
                                    {/* </a>/ */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* reserve company */}
                <div style={{ background: "#111111", justifyContent: "flex-end", color: "white", display: "flex", fontSize: 11, height: 25, alignItems: "center" }}>
                    <div>
                        @ 2019 ETAT LIFE All rights reserved
        </div>
                </div>

            </div >
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
        signUpAction: (user) => {
            dispatch(signUpAction(user))
        },
        buyPackage: (cart) => {
            dispatch(buyPackage(cart))
        },
        payment: (obj) => {
            dispatch(payment(obj))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
