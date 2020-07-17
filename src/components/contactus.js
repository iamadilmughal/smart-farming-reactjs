import React, { Component } from "react";
import "./contactus.css";
import Axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneNumberRegex = RegExp(
  /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
);

const formValid = ({ formErrors, ...rest }) => {
  //form valid function.
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class contactus extends Component {
  constructor(props) {
    //passing properties to the constructor.
    super(props); //extending the component so have to call "super".

    this.state = {
      //contains all the form fields. can either be null or just simply empty strings.

      name: null,
      restaurant: null,
      email: null,
      phoneNumber: null,
      notes: null,

      formErrors: {
        //holds the errors that are likely to pop up.
        name: "",
        restaurant: "",
        email: "",
        phoneNumber: "",
        notes: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      const contactus = {
        name: this.state.name,
        restaurant: this.state.restaurant,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        notes: this.state.notes,
      };
      console.log(contactus);
      Axios.post("http://localhost:5000/help/contact", contactus)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //if the form is invalid then we display the corresponding error message.
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "name":
        formErrors.name =
          value.length < 4 ? "Minimum 4 characters required." : "";
        break;
      case "restaurant":
        formErrors.restaurant =
          value.length < 4 ? "Minimum 4 characters required." : "";
        break;
      case "phoneNumber":
        formErrors.phoneNumber = phoneNumberRegex.test(value)
          ? ""
          : "Invalid phone number";
        break;
      case "notes":
        formErrors.notes =
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
      <div className="wrapper">
        <div className="image-add-form-left">
          <img
            className="form-side-image"
            src={
                 require("../assets/contact.jpg")
            }
            alt="Plant"
          />
        </div>
        <div className="form-wrapper-right-form">
          <h1 className="page-heading">Contact Us</h1>
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
            <div className="email">
              <label htmlFor="email">Email*</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="text"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
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
                className={formErrors.notes.length > 0 ? "error" : null}
                placeholder="Notes"
                type="text"
                name="notes"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.notes.length > 0 && (
                <span className="errorMessage">{formErrors.notes}</span>
              )}
            </div>

            <div className="submit">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default contactus;
