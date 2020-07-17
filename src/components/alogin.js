import React, { Component } from "react";
import "./alogin.css";
import Axios from "axios";
import Auth from "./auth";

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

class alogin extends Component {
  constructor(props) {
    //passing properties to the constructor.
    super(props); //extending the component so have to call "super".

    this.handleChange1 = this.handleChange1.bind(this);

    this.state = {
      //contains all the form fields. can either be null or just simply empty strings.

      email: "",
      password: "",
      role: "admin",
      formErrors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange1(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      const alogin = {
        username: this.state.email,
        password: this.state.password,
        category: this.state.role,
      };
      console.log(alogin);
      if (this.state.role === "admin") {
        var isAuth = await Auth.login(
          this.state.email,
          this.state.password,
          true
        );
        console.log(isAuth);
        if (isAuth == true) {
          this.props.history.push("/dashboard");
          window.location.reload(true);
        } else {
          alert("Wrong Credentials");
        }
      } else {
        var isAuth = await Auth.login(
          this.state.email,
          this.state.password,
          false
        );
        console.log(isAuth);
        if (isAuth == true) {
          this.props.history.push("/dashboard");
          window.location.reload(true);
        } else {
          alert("Wrong Credentials");
        }
      }
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "password":
        formErrors.password =
          value.length < 6 ? "Password has to be more than 6 characters!" : "";
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
        
        <div className="form-wrapper-right-form">
          <h1 class="page-heading">Login</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Username*</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Username"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password*</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="role">
              <label htmlFor="role">Select Role*</label>
              <select value={this.state.role} onChange={this.handleChange1}>
                <option value="admin">Admin</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div className="submit">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default alogin;
