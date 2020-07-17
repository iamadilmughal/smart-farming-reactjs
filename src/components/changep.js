import React, { Component } from "react";
import './changep.css';



const formValid = ({ formErrors, ...rest }) => { //form valid function.
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

class changep extends Component {
  constructor(props) { //passing properties to the constructor.
    super(props); //extending the component so have to call "super".


   
    this.state = { //contains all the form fields. can either be null or just simply empty strings.
    
  
      password: '',
      confirmPassword: '',
      formErrors: { //holds the errors that are likely to pop up.
        
      
        password: "",
        confirmPassword:""
      }
    };
  }

  handleSubmit = e => { 
    const { password, confirmPassword } = this.state;
    // perform all neccassary validations
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
        // make API call
    }

    e.preventDefault();

    if (formValid(this.state)) { //if the form is valid then we pass the values.
      console.log(`
        --SUBMITTING--
      
      
        Password: ${this.state.password}
        ConfirmPassword:  ${this.state.confirmPassword}
      `);
    } else { //if the form is invalid then we display the corresponding error message.
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };





  handleChange = e => {
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
        <div className="form-wrapper">
          <h1>Change Password</h1>
          <form onSubmit={this.handleSubmit} noValidate>
           
           
            
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
            <div className="confirmPassword">
              <label htmlFor="confirmPassword"> Confirm Password*</label>
              <input
                className= "pp"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                noValidate
                onChange={this.handleChange}
              />
            
            </div>
           
            <div className="login">
              <button type="submit">Done</button>
             
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default changep;