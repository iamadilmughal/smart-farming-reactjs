import React, { Component } from "react";
import "./reg.css";
import Axios from "axios";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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

class reg extends Component {
  constructor(props) {
    //passing properties to the constructor.
    super(props); //extending the component so have to call "super".
    this.handleChange1 = this.handleChange1.bind(this);
    this.state = {
      //contains all the form fields. can either be null or just simply empty strings.
      firstName: null,
      lastName: null,
      email: null,
      category: "admin",
      username: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      address: "",
      selectedFile: "",
      formErrors: {
        //holds the errors that are likely to pop up.
        firstName: "", //can also be arrays of strings instead of single strings.
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
      },
    };
  }
  fileChangeHandler = (event) => {
    console.log(event);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  handleChange1(event) {
    event.preventDefault();
    this.setState({ category: event.target.value });
  }

  handleSubmit = (e) => {
    const { password, confirmPassword } = this.state;
    // perform all neccassary validations
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else if (password == "" && confirmPassword == "") {
      alert("Password cannot be empty!");
    } else {
      e.preventDefault();

      if (formValid(this.state)) {
        //if the form is valid then we pass the values.
        let data = new FormData();

        data.append("name", this.state.firstName + " " + this.state.lastName);
        data.append("email", this.state.email);
        data.append("username", this.state.username);
        data.append("password", this.state.password);
        data.append("category", this.state.category);
        data.append("dob", this.state.dateOfBirth);
        data.append("address", this.state.address);
        data.append("profileImage", this.state.selectedFile);

        for (var key of data.entries()) {
          console.log(key[0] + ": " + key[1]);
        }

        if (this.state.category == "expert") {
          Axios.post("https://smart-farming-backend.herokuapp.com/expert/", data)
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 1) {
                alert("Expert Added Successfully");
                this.props.history.push("/viewExperts");
              } else {
                if (res.data.message) alert(res.data.message);
                else {
                  alert("Some Error Occured");
                }
              }
            })
            .catch((error) => {
              alert("Some Error Occured");
              console.log(error);
            });
        } else if (this.state.category == "admin") {
          Axios.post("https://smart-farming-backend.herokuapp.com/admin/", data)
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 1) {
                alert("Admin Added Successfully");
                this.props.history.push("/viewExperts");
              } else {
                if (res.data.message) alert(res.data.message);
                else {
                  alert("Some Error Occured");
                }
              }
            })
            .catch((error) => {
              alert("Some Error Occured");
              console.log(error);
            });
        } else {
          Axios.post("https://smart-farming-backend.herokuapp.com/farmer/", data)
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 1) {
                alert("Farmer Added Successfully");
                this.props.history.push("/viewUsers");
              } else {
                if (res.data.message) alert(res.data.message);
                else {
                  alert("Some Error Occured");
                }
              }
            })
            .catch((error) => {
              alert("Some Error Occured");
              console.log(error);
            });
        }
      } else {
        //if the form is invalid then we display the corresponding error message.
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        alert("Invalid Form Entry - Please Fill Empty Fields");
      }
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3
            ? "First name has to be more than 3 characters!"
            : ""; //using ternary operator.
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "Last name has to be more than 3 characters!" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
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
        <div className="image-add-form-left">
          <img
            className="form-side-image"
            src={require("../assets/user-image.png")}
            alt="Plant"
          />
        </div>
        <div className="form-wrapper-right-form">
          <h1 className="page-heading">Add a User</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="category">
              <label htmlFor="category">Select Category*</label>
              <select value={this.state.value} onChange={this.handleChange1}>
                <option value="admin">Admin</option>
                <option value="expert">Expert</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>
            <div className="firstName">
              <label htmlFor="firstName">First Name*</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name*</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email*</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="usernameDiv">
              <label htmlFor="username">Username*</label>
              <input
                className={formErrors.username.length > 0 ? "error" : null}
                placeholder="Username"
                type="text"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>
            <div className="passwordDiv">
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
            <div className="confirmPasswordDiv">
              <label htmlFor="confirmPassword"> Confirm Password*</label>
              <input
                className="pp"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="dateOfBirth">
              <label htmlFor="dateOfBirth"> Date of Birth*</label>
              <input
                placeholder="Date Of Birth"
                type="date"
                name="dateOfBirth"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="address">
              <label htmlFor="address"> Address*</label>
              <textarea
                placeholder="Address"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="fileDiv">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group files">
                    <label>Upload Your File </label>
                    <input
                      type="file"
                      name="file"
                      multiple
                      onChange={this.fileChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="createAccount">
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default reg;
