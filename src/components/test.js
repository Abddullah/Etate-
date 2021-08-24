import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import { Navbar, Nav, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      cart: "",
    };
    this.radioChange = this.radioChange.bind(this);

  }
  componentWillMount() {
    this.setState({
      cart: this.props.history.location.state
    })
    console.log(this.props.history.location.state, "++++++++++++++")
  }

  radioChange(e) {
    // alert(e.currentTarget.value)
    let cart;

    if (e.currentTarget.value === "Solo") {
      cart = { package: "Solo clinic", price: "75", duration: "60" }
    }
    else if (e.currentTarget.value === "Single") {
      cart = { package: "Single clinic", price: "99", duration: "30" }
    }
    else if (e.currentTarget.value === "multiple") {
      cart = { package: "Multi clinic", price: "75", duration: "30" }
    }
    this.setState({
      selectedOption: e.currentTarget.value,
      cart
    });
  }
  render() {
    const { cart } = this.state
    console.log(cart, "555555555")
    var d = new Date(Date.now() + 2592000000),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#F0F0F0", height: window.innerHeight, flexDirection: "column" }}>
        {!cart &&
          <div>
            <div style={{ width: 550, flexDirection: "row", display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ justifyContent: "flex-start", display: "flex", marginTop: "1%" }}>
                My Subcription :
          </div>
              <div>
                <div>
                  <input type="radio"
                    value="Solo"
                    checked={this.state.selectedOption === "Solo"}
                    onChange={this.radioChange} />
                  Solo Clinic (One doctor & one business address)
               </div>
                <div>

                  <input type="radio"
                    value="Single"
                    checked={this.state.selectedOption === "Single"}
                    onChange={this.radioChange} />Single Clinic (Upto 4 doctors & one business address)
               </div>
                <div>

                  <input type="radio"
                    value="multiple"
                    checked={this.state.selectedOption === "multiple"}
                    onChange={this.radioChange} />
                  Multi Clinic (Upto 12 doctor & multiple business address)
              </div>

              </div>
            </div>


            <div style={{ width: 550, flexDirection: "row", display: "flex", }}>
              <div style={{ justifyContent: "flex-start", display: "flex", marginTop: "1%" }}>
                Subcription ends :
          </div>
              <div style={{ justifyContent: "flex-start", display: "flex", marginTop: "1%", marginLeft: 5 }}>
                <span style={{ textDecorationLine: "underline", }}>{month + "/" + day + "/" + year}</span>
              </div>
            </div>
          </div>}
        <StripeProvider apiKey="pk_test_U9uY7QRX0EXNK498S9xXMdLq00lZFZLU1g">
          <div className="example" style={{
            width: 550, height: 300, border: "0.1px solid #F2F5F3", padding: 15, marginTop: "2%",
            background: "#fff",
            borderRadius: 10,
            webkitBoxShadow: "3px 3px 3px #9E9E9E",
            mozBoxShadow: "3px 3px 3px #9E9E9E",
            boxShadow: "3px 3px 3px #9E9E9E",
          }}>
            <h1>{cart && cart.package}</h1>
            <h4>price : {cart && cart.price}</h4>
            <h4>duration : {cart && cart.duration}</h4>
            <Elements>
              <CheckoutForm data={cart} />
            </Elements>
          </div>
        </StripeProvider>
      </div>

    );
  }
}

export default App;