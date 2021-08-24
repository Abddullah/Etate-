import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { Button, Form, Row, Col, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import history from '../History';
import { payment } from '../store/action/action';
import ActivityIndicator from './common/ActivityIndicator';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: 'Please fill out all fields'
    }
    this.submit = this.submit.bind(this);
  }

  async submit(data) {
    console.log(data, "data")
    const { errorMessage } = this.state
    if (errorMessage) {
      alert(errorMessage)
      return;
    }
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    // let response = await fetch("http://localhost:5000/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: {amount:250,id:token.id}
    // }).then((res)=>console.log(res,"resresresres",))
    if (data) {
      // axios.post("http://localhost:5000/charge", {
      axios.post("https://etate-life.herokuapp.com/charge", {
        amount: data.price, id: token.id, title: data.package, email: this.props.currentUser.email
      }).then((res) => {
        // window.location.reload()
        this.props.payment(data)

        // alert("payment succesfully sent")
        // history.push("/home")
        console.log(res, "resresresres")
      })
        .catch(function (error) {

          console.log("error", error);
        });
    }
    // else if(!data){
    //   alert("First select your package")
    // }

    console.log(token, "Purchase Complete!")
  }

  onChangeText(change) {
    if (change.error) {
      this.setState({
        errorMessage: change.error.message
      })
    } else {
      this.setState({
        errorMessage: ''
      })
    }
  }

  render() {
    const { data,isLoader } = this.props
    console.log(data, "caaaaaaaaaaaaa")
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement onChange={(change) => this.onChangeText(change)} style={{ base: { fontSize: '22px' } }} />
        {/* <button onClick={this.submit}>Purchase</button> */}
        <div style={{ marginTop: 15 }}>
          
          {isLoader ?
            <Button variant="primary">
              <ActivityIndicator />
            </Button> :
           <Button disabled={data?false:true} variant="primary" onClick={() => this.submit(data)}>Purchase</Button>
          }
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    isLoader: state.root.isLoader,
    isError: state.root.isError,
    errorMessage: state.root.errorMessage,
    currentUser: state.root.currentUser,
    //   errorInStore: state.root.error,
  };
};
function mapDispatchToProps(dispatch) {
  return ({
    payment: (obj) => {
        dispatch(payment(obj))
    },
    // forgetPassword: (email) => {
    //     dispatch(forgetPassword(email))
    // },
  })
}
// export default injectStripe(CheckoutForm);

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));