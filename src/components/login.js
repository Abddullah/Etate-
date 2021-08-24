import React, { Component, } from 'react';
import { Button, Form, Row, Col, } from 'react-bootstrap';
import AppHeader from './common/AppHeader';
import ActivityIndicator from './common/ActivityIndicator';
import { signinAction } from '../store/action/action';
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
    }
    componentWillMount() {
    }
    render() {
        const { email, password } = this.state
        const { isLoader, isError, errorMessage } = this.props
        let user = { email, password }
        return (
            <div style={{ backgroundColor: "#F0F0F0", height: window.innerHeight }}>
                {/* header */}
                <AppHeader login={true} button="Signup" />
                <center>
                    {/* login form */}
                    <div style={{
                        backgroundColor: "#fff", width: 360, padding: "1%", marginTop: "7%",
                        borderRadius: 10,
                        webkitBoxShadow: "3px 3px 3px #9E9E9E",
                        mozBoxShadow: "3px 3px 3px #9E9E9E",
                        boxShadow: "3px 3px 3px #9E9E9E",
                        height: 450
                    }}>
                        <div style={{}}>
                            <img src={require('../assets/updatedLogo.png')} alt="aaaa" />
                        </div>
                        <div style={{ fontWeight: "bold", marginTop: 22, }}>
                            Connect to your patients
                        </div>
                        <Form style={{ width: "80%", marginTop: "7%" }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control defaultValue={email} onChange={(e) => { this.setState({ email: e.target.value }) }}
                                    type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control defaultValue={password} onChange={(e) => { this.setState({ password: e.target.value }) }}
                                    type="password" placeholder="Password" />
                            </Form.Group>
                        </Form>
                        {isLoader ?
                            <Button style={{ width: 255, fontSize: 11, marginTop: "3%" }} variant="primary" disabled={true}>
                                <ActivityIndicator />
                            </Button> :
                            <Button onClick={() => { this.props.signinAction(user) }} style={{ width: 255, fontSize: 11, marginTop: "3%" }} variant="primary" > Login</Button>
                        }

                        <Row style={{ marginTop: "7%" }} >
                            <Col>
                                <Form.Check type="checkbox" label="Remember me" />
                            </Col>
                            <Col>
                               <Link to="/ForgetPassword"> <span>Forget password</span></Link>
                            </Col>
                        </Row>
                        <hr />
                        <div>
                            <span>not a member yet? <Link to="/signup"> <span>Join now</span></Link></span>
                        </div>
                    {isError && <div><span style={{color:"red",fontSize:13}}>{errorMessage}</span></div>}

                    </div>
                </center>
            </div>
        )
    }
}

// export default Login


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
        signinAction: (user) => {
            dispatch(signinAction(user))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


