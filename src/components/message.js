import React, { Component } from "react";
import "./message.css";
import Axios from "axios";
const Nexmo = require("nexmo");

const phoneNumberRegex = RegExp(
  /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
);
const nexmo = new Nexmo({
  apiKey: "c3873b72",
  apiSecret: "WLiuiPAFQFX3vRKh"
});

const formValid = ({ formErrors, ...rest }) => {
  //form valid function.
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class message extends Component {
  constructor(props) {
    //passing properties to the constructor.
    super(props); //extending the component so have to call "super".

    this.state = {
      //contains all the form fields. can either be null or just simply empty strings.

      name: "",
      phoneNumber: "",
      message: "",

      formErrors: {
        //holds the errors that are likely to pop up.
        name: "",
        phoneNumber: "",
        message: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      const from = this.state.phoneNumber;
      const to = "923085991266";
      const text = this.state.message;

      const msg = "Message: " + text + "FROM: " + from;

      nexmo.message.sendSms(from, to, msg)

      alert("Message Sent");
    } else {
      //if the form is invalid then we display the corresponding error message.
      console.error("FORM INVALID");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 4 ? "Minimum 4 characters required." : "";
        break;
      case "phoneNumber":
        formErrors.phoneNumber = phoneNumberRegex.test(value)
          ? ""
          : "Invalid phone number";
        break;
      case "message":
        formErrors.message =
          value.length < 6 ? "Minimum 6 characters required." : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper1">
        <div className="form-wrapper">
          <h1>Send Message</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="name">
              <label htmlFor="name">Name*</label>
              <input
                className={formErrors.name.length > 0 ? "error" : null}
                placeholder="Name"
                type="text"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>

            <div className="phoneNumber">
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                className={formErrors.phoneNumber.length > 0 ? "error" : null}
                placeholder="Phone Number"
                type="text"
                name="phoneNumber"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phoneNumber.length > 0 && (
                <span className="errorMessage">{formErrors.phoneNumber}</span>
              )}
            </div>
            <div className="notes">
              <label htmlFor="notes">Message*</label>
              <input
                className={formErrors.message.length > 0 ? "error" : null}
                placeholder="Message"
                type="text"
                name="message"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.message.length > 0 && (
                <span className="errorMessage">{formErrors.message}</span>
              )}
            </div>

            <div className="login">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default message;
