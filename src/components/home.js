import React, { Component, } from 'react';
import { Button, Form, Row, Col, } from 'react-bootstrap';
import AppHeader from './common/AppHeader';
import BreadCrum from './common/BreadCrum';
import { userUpdate } from '../store/action/action';
import { connect } from "react-redux";
import Select from 'react-select';
import countryList from './common/countryList';
import Input from './common/input';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import PhoneInput, { getCountryCallingCode, getCountries } from 'react-phone-number-input'
import en from 'react-phone-number-input/locale/en.json'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { fullName: "", email: "", password: "", confirmPassword: "", phone: "", currentPassword: "", country: "", };
    }

    componentWillReceiveProps(nextProps) {
        const { currentUser } = this.props
        console.log(nextProps, "--*-*", currentUser)
        if (nextProps.currentUser) {
            console.log(nextProps, "ifffffff", currentUser)

            this.setState({
                fullName: nextProps.currentUser.fullName,
                email: nextProps.currentUser.email,
                phone: Number(nextProps.currentUser.phone),
                // currentPassword: "",
                CheckCurrPass: nextProps.currentUser.password,
                // password: "",
                abbr: nextProps.currentUser.country,
                country: nextProps.currentUser.country.abbr,


                // confirmPassword: "",
            })
        }

    }
    componentDidMount() {
        const { currentUser } = this.props
        // console.log(nextProps, "componentWillMount")
        if (currentUser) {

            this.setState({
                fullName: currentUser.fullName,
                email: currentUser.email,
                phone: Number(currentUser.phone),
                // currentPassword: "",
                CheckCurrPass: currentUser.password,
                abbr: currentUser.country,
                country: currentUser.country.abbr,
            })
        }

    }
    render() {
        const { isLoader, isError, errorMessage, currentUser, userUpdate } = this.props
        const { fullName, email, password, confirmPassword, phone, currentPassword, CheckCurrPass, country } = this.state
        let user = { fullName, email, password, confirmPassword, phone, currentPassword, CheckCurrPass }

        console.log(currentUser, "cccc", country)
        let inputs = [
            { state: "fullName", label: "Full Name", type: "text", placeholder: "Full Name", defaultValue: fullName },
            // { state: "phone", label: "Phone", type: "number", placeholder: "Mobile Number", defaultValue: phone },
            { state: "email", label: "Email", type: "email", placeholder: "Email", defaultValue: email },
            { state: "currentPassword", label: "Current Password", type: "text", placeholder: "Current Password", },
            { state: "password", label: "New Password", type: "text", placeholder: "New Password", },
            { state: "confirmPassword", label: "Confirm Password", type: "text", placeholder: "Confirm Password", },
        ]
        console.log(this.state, "sssssss")
        return (
            <div style={{ backgroundColor: "#fff", }}>
                {/* header */}
                <AppHeader />
                {/* routes */}
                <BreadCrum color="Account details" />
                <div style={{
                    display: "flex", justifyContent: "center"
                }}>
                    <div style={{
                        padding: "1%", marginTop: "5%",
                        borderRadius: 10,
                    }} >
                        {/* <div>
                            <PhoneInput
                            country={currentUser&&currentUser.countryAbbrev}
                                style={{backgroundColor:"red",width:200}}
                                onCountryChange={value => console.log(value, "onCountryChange")}
                                placeholder="Enter phone number"
                                value={this.state.value}
                                onChange={value => console.log(value, "value")}
                            />
                        </div> */}
                        <Form style={{ width: 390 }}>

                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={4} style={{ display: "flex", alignItems: "center", fontSize: 13, fontWeight: "bold" }}>
                                    {"Mobile number"}
                                </Form.Label>
                                <Col sm={8}>
                                    {
                                        currentUser && this.state.abbr &&
                                        <select
                                            style={{ width: 248, padding: 7, borderRadius: 5, marginTop: 10 }}
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
                                    <Form.Control
                                        defaultValue={phone}
                                        type="number" placeholder="phone number"
                                        style={{ marginTop: 15 }}
                                        onChange={(e) => { this.setState({ phone: "+" + getCountryCallingCode(this.state.country) + e.target.value }) }} />
                                    {/* {country&&
                                    // console.log(getCountryCallingCode(country.abbr),"getCountryCallingCode(this.state.country.abbr)")&&
                                        <Form.Control  type="text"  
                                        defaultValue={ country.abbr} 
                                        onChange={(e) => { console.log(getCountryCallingCode(country.abbr),"coder") }} />


                                    } */}
                                </Col>

                            </Form.Group>
                            {inputs.map((v, i) => {
                                return (
                                    <Input label={v.label} type={v.type} placeholder={v.placeholder} disable={i === 1 && true} defaultValue={v.defaultValue}
                                        func={(text) => this.setState({ [v.state]: text })} />
                                )
                            })}
                            {isError && <div><span style={{ color: "red", fontSize: 13 }}>{errorMessage}</span></div>}

                        </Form>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", padding: "5%", paddingRight: "10%" }}>
                    <Button variant="outline-primary" onClick={() => { userUpdate(user) }} >Save Changes</Button>
                    <Link to="/bussinesCatogery"><Button variant="outline-primary"  >Next</Button></Link>
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
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        userUpdate: (user) => {
            dispatch(userUpdate(user))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


