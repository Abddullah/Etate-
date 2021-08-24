import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import countryList from './common/countryList';
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import PhoneInput,{ getCountryCallingCode, } from 'react-phone-number-input'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import Select from 'react-select';
import en from 'react-phone-number-input/locale/en.json'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    };
    this.radioChange = this.radioChange.bind(this);
  }


  
  radioChange(e) {
    this.setState({
      selectedOption: e.currentTarget.value
    });
  }
  render() {
    const { cart} = this.state
    console.log(cart, "555555555")
    return (
      <div>
        
        <input type="radio"
               value="Yes"
               checked={this.state.selectedOption === "Yes"}
               onChange={this.radioChange} />Yes

        <input type="radio"
               value="No"
               checked={this.state.selectedOption === "No"}
               onChange={this.radioChange}/>No
        
        <h3>this.state.selectedOption: {this.state.selectedOption}</h3>
      </div> 

    );
  }
}

export default App;