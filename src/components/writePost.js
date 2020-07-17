import React, { Component } from "react";
import "./writePost.css";
import Axios from "axios";
import Auth from "./auth"

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

class WritePost extends Component {
  constructor(props) {
    super(props);

    // this.onSubmit= this.onSubmit.bind(this);
    this.state = {
      postName: null,
      description: null,
      selectedFile: "",
      postedBy: "",
      category: "question",
      selectedFileURL: "",
      formErrors: {
        postName: "",
        description: ""
      }
    };
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileURL: URL.createObjectURL(event.target.files[0]), 
      loaded: 0
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      
      var data = new FormData();

      data.append('postTitle', this.state.postName);
      data.append('postDescription', this.state.description);
      data.append('category', this.state.category);
      data.append('postedBy', this.state.postedBy);
      data.append('datePosted', Date.now());
      data.append('postImage', this.state.selectedFile);


      console.log(data);
      Axios.post("http://localhost:3000/community/", data)
        .then(res => {
          if(res.data.status === 1){
            alert('Post Added Successfully');
          }
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  componentDidMount(){
    this.setState({
      postedBy: Auth.getUsername()
    })
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "postName":
        formErrors.postName =
          value.length < 4 ? "Minimum 4 characters required." : "";
        break;

      case "description":
        formErrors.description =
          value.length < 10 ? "minimum 10 characaters required" : "";
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
              this.state.selectedFileURL != ""
                ? this.state.selectedFileURL
                : require("../assets/pest-image.png")
            }
            alt="Plant"
          />
        </div>
        
        <div className="form-wrapper-right-form">
          <h1 className="page-heading">Write a Post</h1>
          <form onSubmit={this.handleSubmit} id="postForm" noValidate>
            <div className="postName">
              <label htmlFor="postName">Post Title*</label>
              <input
                className={formErrors.postName.length > 0 ? "error" : null}
                placeholder="Post Title"
                type="text"
                name="postName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.postName.length > 0 && (
                <span className="errorMessage">{formErrors.postName}</span>
              )}
            </div>

            <div className="description">
              <label htmlFor="description">Description*</label>
              <textarea
                className={formErrors.description.length > 0 ? "error" : null}
                placeholder="Description"
                type="textarea"
                name="description"
                noValidate
                multiple
                onChange={this.handleChange}
              />
              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
            </div>

            <div className="postedBy">
              <label htmlFor="postedBy">Your Name*</label>
              <input
                className={formErrors.description.length > 0 ? "error" : null}
                placeholder="Your Name"
                type="textarea"
                name="postedBy"
                value={this.state.postedBy}
                disabled
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.postedBy}</span>
              )}
            </div>            

            <div className="category">
              <label htmlFor="category">Select Category*</label>
              <select value={this.state.value} onChange={(event)=>{
                event.preventDefault();
                this.setState({ category: event.target.value });
              }}>
                <option value="question">Question</option>
                <option value="article">Article</option>
              </select>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group files">
                    <label>Upload Picture </label>
                    <input
                      type="file"
                      name="file"
                      multiple
                      onChange={this.onChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="login">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default WritePost;
