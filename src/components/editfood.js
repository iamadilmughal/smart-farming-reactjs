import React, { Component } from "react";
import "./editfood.css";
import Axios from "axios";


const formValid = ({ formErrors, ...rest }) => {
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

export default class editfood extends React.Component {
  constructor(props) {
    super(props);
    
    this.radioChangeHandler = this.radioChangeHandler.bind(this);
    // this.onSubmit= this.onSubmit.bind(this);
    this.state = {
      foodName: '',
      price: '',
      description: '',
      foodType:'',
    
      
     
      formErrors: {
        foodName: "",
        price: "",
        description: ""
   
    
      }
    };
  }
  componentDidMount() {
    
    Axios.get('http://localhost:5000/food/'+this.props.match.params.id)//check the localhost link 
        .then(response => {
          console.log(response)
            this.setState({
                foodName: response.data.name,
                price: response.data.price,
                description: response.data.description,
                foodType: response.data.type
               
            })
        })
        .catch(function(error) {
            console.log(error)
        })
}

  radioChangeHandler=(event)=> {
    this.setState({
      foodType: event.target.value
    });
  }


  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      const productdetails={
        foodName: this.state.foodName,
        price: this.state.price,
        description: this.state.description,
        foodType: this.state.foodType
        
        

      }
      console.log(productdetails)
      Axios.patch('http://localhost:5000/food/update/'+this.props.match.params.id,productdetails)
      .then(res =>{ console.log(res.data)})
      // this.props.history.push('/');
      
    } 
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };
    
   

    switch (name) {
      case "foodName":
        formErrors.foodName =
        value.length < 4 ? "Minimum 4 characters required." : "";
        break;
      case "price":
        formErrors.price = value.length < 2 ? "minimum 3 characaters required" : "";
        break;
      case "description":
        formErrors.description =  value.length < 10 ? "minimum 10 characaters required" : "";
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
            <h1>Edit Product Details</h1>
            <form onSubmit={this.handleSubmit} noValidate>

              <div className="foodName">
                <label htmlFor="foodName">Food Name*</label>
                <input className={formErrors.foodName.length > 0 ? "error" : null}
                  placeholder="Food Name"
                  type="text"
                  name="foodName"
                  noValidate
                  value={this.state.foodName}
                  onChange={this.handleChange}
                />
                {formErrors.foodName.length > 0 && (
                <span className="errorMessage">{formErrors.foodName}</span>
              )}
               
              </div>
              <div className="price">
                <label htmlFor="price">Price*</label>
                <input
                  className={formErrors.price.length > 0 ? "error" : null}
                  placeholder="Price"
                  type="text"
                  name="price"
                  noValidate
                  value={this.state.price}
                  onChange={this.handleChange}
                />
                {formErrors.price.length > 0 && (
                <span className="errorMessage">{formErrors.price}</span>
              )}
  
               <div className="description">
                <label htmlFor="description">Description*</label>
                <input className={formErrors.description.length > 0 ? "error" : null}
                  
                  placeholder="Description"
                  type="text"
                  name="description" 
                  noValidate
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                 {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
                
               
              </div>
              <div className="foodType"><label>Food Type*</label>
                <input
                  type="radio"
                  value="veg"
                  checked={this.state.foodType === "veg"}
                  onChange={this.radioChangeHandler}
                />Veg
                <input
                  type="radio"
                  value="non-veg"
                  checked={this.state.foodType === "non-veg"}
                  onChange={this.radioChangeHandler}
                /> Non-veg
          
             
             
               
              </div>
  
              
              </div>
              <div className="login">
                <button type="submit">Update</button>
               
              </div>
            </form>
          </div>
        </div>
    );
  }
}

