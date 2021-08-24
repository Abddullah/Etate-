import React, { Component, } from 'react';
import { Button, Form, Row, Col, } from 'react-bootstrap';
import AppHeader from './common/AppHeader';
import ActivityIndicator from './common/ActivityIndicator';
import { UserActivation,forgetPassword } from '../store/action/action';
import { connect } from "react-redux";
class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { email:"" };
    }
    componentWillMount() {
       console.log(this.props.history.location.state,"wilmount") 
    }
    render() {
        const { email} = this.state
        const { isLoader, isError, errorMessage } = this.props
        // let verifyCodeObj={verifyCode:verifyCode,againstVerifyCode:this.props.history.location.state}
        return (
            <div style={{ backgroundColor: "#F0F0F0", height: window.innerHeight }}>
                {/* header */}
                <AppHeader login={true} button="Signup" />
                <center>
                    {/* login form */}
                    <div style={{
                        backgroundColor: "#fff", width: 300, padding: "1%", marginTop: "7%",
                        borderRadius: 10,
                        webkitBoxShadow: "3px 3px 3px #9E9E9E",
                        mozBoxShadow: "3px 3px 3px #9E9E9E",
                        boxShadow: "3px 3px 3px #9E9E9E",
                        height: 350
                    }}>
                        <div style={{}}>
                            <img src={require('../assets/updatedLogo.png')} alt="aaaa" />
                        </div>
                        <div style={{ fontWeight: "bold", marginTop: 22, }}>
                            Connect to your patients
                        </div>
                        <div style={{  marginTop: 22, }}>
                        Type your email
                        </div>
                        <Form style={{ width: "80%", marginTop: "7%" }}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control defaultValue={email} onChange={(e) => { this.setState({ email: e.target.value }) }}
                                    type="email" placeholder="type your email" />
                            </Form.Group>
                        </Form>
                        {isLoader ?
                            <Button style={{ width: 255, fontSize: 11, marginTop: "3%" }} variant="primary" disabled={true}>
                                <ActivityIndicator />
                            </Button> :
                            <Button onClick={() => { this.props.forgetPassword(email) }} style={{ width: 255, fontSize: 11, marginTop: "3%" }} variant="primary" > Forget password</Button>
                        }
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
        UserActivation: (verifyCodeObj) => {
            dispatch(UserActivation(verifyCodeObj))
        },
        forgetPassword: (email) => {
            dispatch(forgetPassword(email))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);


