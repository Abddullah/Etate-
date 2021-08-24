import React, { Component, } from 'react';
import { Navbar, Nav, Button, Form, FormControl, Row, Col, Container, Layout } from 'react-bootstrap';
import AppHeader from './common/AppHeader';
import ActivityIndicator from './common/ActivityIndicator';
import { signUpAction } from '../store/action/action';
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { fullName: "", email: "", password: "", confirmPassword: "",phone:"" };
    }

    componentWillMount() {
        this.setState({ height: window.innerHeight, width: window.innerWidth });
    }


    render() {
        const { fullName, email, password, confirmPassword,phone } = this.state
        const { isLoader, isError, errorMessage } = this.props
        let user = { fullName, email,phone, password, confirmPassword,status:false }
        return (
            <div style={{ backgroundColor: "#F0F0F0", height: window.innerHeight }}>
                <AppHeader login={true} button="Signup" />
                {/* header */}
                <center>
                    {/* signup form */}
                    <div style={{
                        backgroundColor: "#fff", width: 360, padding: "1%", marginTop: "3%",
                        borderRadius: 10,
                        webkitBoxShadow: "3px 3px 3px #9E9E9E",
                        mozBoxShadow: "3px 3px 3px #9E9E9E",
                        boxShadow: "3px 3px 3px #9E9E9E",
                        height: 600
                    }}>
                        <div style={{}}>
                            <img src={require('../assets/updatedLogo.png')} alt="aaaa" />
                        </div>
                        <div style={{ fontWeight: "bold", marginTop: "7%", }}>
                            Connect to your patients
                        </div>
                        <Form style={{ width: "80%", marginTop: "7%" }}>
                            <Form.Group >
                                <Form.Control defaultValue={fullName} onChange={(e) => { this.setState({ fullName: e.target.value }) }}
                                    type="text" placeholder="Full name" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control defaultValue={email} onChange={(e) => { this.setState({ email: e.target.value }) }} 
                                type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control defaultValue={phone} onChange={(e) => { this.setState({ phone: e.target.value }) }} 
                                type="number" placeholder="Enter phone" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control defaultValue={password} onChange={(e) => { this.setState({ password: e.target.value }) }} 
                                type="password" placeholder="Enter password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control defaultValue={confirmPassword} onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }}  
                                type="password" placeholder="Confirm password" />
                            </Form.Group>
                        </Form>
                        {isLoader ?
                            <Button style={{ width: 255, fontSize: 11, marginTop: "3%" }} variant="primary" disabled={true}>
                                <ActivityIndicator />
                            </Button> :
                            <Button onClick={() => { this.props.signUpAction(user) }} style={{ width: 255, fontSize: 11, marginTop: "3%" }} variant="primary" > Signup</Button>
                        }
                        <Row style={{ marginTop: "7%" }} >
                            <Col>
                                <Form.Check type="checkbox" label="Remember me" />
                            </Col>
                            <Col>
                            <Link to="/ForgetPassword"> <span>Forget password</span></Link>
                            </Col>
                            {/* <Form.Group controlId="formBasicCheckbox"> */}
                            {/* </Form.Group> */}
                        </Row>
                        <hr />
                        <div>
                   <Link to="/login"> <span>Already hav an account?</span></Link>

                            {/* <span>Already hav an account? </span> */}
                        </div>
                        {isError && <div><span style={{color:"red",fontSize:13}}>{errorMessage}</span></div>}
                    </div>
                </center>
            </div>
        )
    }
}
let mapStateToProps = state => {
    return {
        isLoader: state.root.isLoader,
        isError: state.root.isError,
        errorMessage: state.root.errorMessage,
        //   errorInStore: state.root.error,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        signUpAction: (user) => {
            dispatch(signUpAction(user))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

