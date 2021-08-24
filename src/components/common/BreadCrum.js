import React, { Component, } from 'react';
import { Navbar, Nav, Button, Form, } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { color} = this.props
        return (
            <center>
                <div style={{ marginTop: "3%" }}>
                    <Link to={"home"}>   <span style={{ fontWeight: "bold", color: color==="Account details"?"#285BAC":"black" }}>1. Account details</span></Link>
                    {/* <a to={"#"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color: "black" }}>2. Business address</span></a> */}
                    <Link to={"bussinesCatogery"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color:color==="Clinic address"?"#285BAC":"black" }}>2. Clinic address</span></Link>
                    {/* <a to={"#"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color: "black" }}>3. Opening hours</span></a> */}
                    <Link to={"addDoctor"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color: color==="Doctors"?"#285BAC":"black"  }}>3. Doctors</span></Link>
                    <Link to={"AddBookingAdmin"}>   <span style={{ marginLeft: "5%", fontWeight: "bold", color: color==="Booking administrator"?"#285BAC":"black" }}>4. Booking administrator</span></Link>
                </div>
            </center>
        )
    }
}

export default Breadcrumbs



