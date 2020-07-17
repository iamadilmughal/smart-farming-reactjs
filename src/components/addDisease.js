import React, { Component } from "react";
import "./addDisease.css";
import Axios from "axios";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  return valid;
};

class AddDisease extends Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);

    this.state = {
      pestOption: [],

      editMode: false,
      _id: "",

      diseaseID: "",
      name: "",
      description: "",
      symptoms: "",
      cures: "",
      selectedFile: "",
      selectedFileURL: "",
      causedBy: [],
      severityType: "",
      formErrors: {
        name: "",
        description: "",
        diseaseName: "",
        symptoms: "",
        cures: "",
      },
    };

    this.radioChangeHandler = this.radioChangeHandler.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id != null) {
      Axios.get("http://localhost:3000/disease/" + id)
        .then((response) => {
          this.setState({
            editMode: true,
            _id: id,
            diseaseID: response.data.diseaseID,
            name: response.data.diseaseName,
            description: response.data.description,
            symptoms: response.data.symptoms,
            cures: response.data.cures,
            causedBy: response.data.causedBy,
            severityType: response.data.severity,
            selectedFileURL: response.data.diseaseImage,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    this.loadPestOptions();
  }

  handleChange1(event) {
    // event.preventDefault();
    console.log(event);
    this.setState({ value: event.target.value });
  }
  handleChange2(event) {
    event.preventDefault();
    console.log(event);
    this.setState({ value1: event.target.value1 });
  }
  handleChange3(e) {
    const { value2 } = e.target;
    console.log(e);
    this.setState({ value2: value2 }, () => console.log(this.state));
  }

  radioChangeHandler(event) {
    // event.preventDefault();
    this.setState({
      severityType: event.target.value,
    });
    console.log(this.state);
  }

  fileChangeHandler = (event) => {
    console.log(event);
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileURL: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // alert("clicked");

    console.log(formValid(this.state));

    if (formValid(this.state)) {
      var data = new FormData();

      console.log("Here");

      if (this.state.editMode) {
        data.append("_id", this.state._id);
      }

      console.log(this.state.causedBy);

      data.append("diseaseID", this.state.diseaseID);
      data.append("name", this.state.name);
      data.append("description", this.state.description);
      data.append("causedBy", this.state.causedBy);
      data.append("severity", this.state.severityType);
      data.append("symptoms", this.state.symptoms);
      data.append("cures", this.state.cures);
      data.append("diseaseImage", this.state.selectedFile);

      console.log(data);

      if (this.state.editMode) {
        Axios.put("http://localhost:3000/disease/", data)
          .then((res) => {
            if (res.data.status === 1) {
              alert("Disease Updated Successfully");
              this.props.history.push("/viewDiseases");
            } else {
              alert("Error Occured" + res.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Axios.post("http://localhost:3000/disease", data)
          .then((res) => {
            if (res.data.status === 1) {
              alert("Disease Added Successfully");
              this.props.history.push("/viewDiseases");
            } else {
              alert("Error Occured" + res.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      console.log(this.state.formErrors);
    }
  };

  loadPestOptions() {
    Axios.get("http://localhost:3000/pest/")
      .then((response) => {
        this.setState({ pestOption: response.data.result });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getPestOptions() {
    return this.state.pestOption.map((pestOption, index) => {
      const { pestName, _id } = pestOption; //destructuring
      return (
        <option
          selected={this.state.causedBy.includes(_id)}
          value={_id}
          key={_id}
        >
          {pestName}
        </option>
      );
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

      case "description":
        formErrors.description =
          value.length < 10 ? "minimum 10 characaters required" : "";
        break;

      case "diseaseName":
        formErrors.diseaseName = value.length <= 0 ? "Cannot Be Empty" : "";
        break;

      case "symptoms":
        formErrors.symptoms = value.length <= 0 ? "Cannot Be Empty" : "";
        break;

      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handlePestSelect = (e) => {
    e.preventDefault();
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      causedBy: value,
    });
    console.log(this.state);
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="image-add-form-left">
          <img
            className="form-side-image"
            src={
              this.state.selectedFileURL === ""
                ? require("../assets/disease-image.png")
                : this.state.selectedFileURL
            }
            alt="Plant"
          />
        </div>
        <div className="form-wrapper-right-form">
          <h1 className="page-heading">
            {this.state.editMode
              ? "Update Disease Details"
              : "Add Disease Details"}
          </h1>
          <form
            onSubmit={this.handleSubmit}
            noValidate
            className="addDiseaseForm"
          >
            <div className="diseaseName">
              <label htmlFor="diseaseName">Disease Name*</label>
              <input
                className={formErrors.diseaseName.length > 0 ? "error" : null}
                placeholder="Disease Name"
                type="text"
                name="name"
                value={this.state.name}
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.diseaseName.length > 0 && (
                <span className="errorMessage">{formErrors.diseaseName}</span>
              )}
            </div>
            <div className="diseaseID">
              <label htmlFor="diseaseID">Disease ID</label>
              <input
                placeholder="Disease ID"
                type="text"
                name="diseaseID"
                value={this.state.diseaseID}
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="diseaseDescription">
              <label htmlFor="diseaseDescription">Description*</label>
              <textarea
                className={formErrors.description.length > 0 ? "error" : null}
                placeholder="Description"
                name="description"
                value={this.state.description}
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
            </div>

            <div className="symptoms">
              <label htmlFor="symptoms">Symptoms*</label>
              <textarea
                placeholder="Symptoms"
                type="text"
                value={this.state.symptoms}
                name="symptoms"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.symptoms.length > 0 && (
                <span className="errorMessage">{formErrors.symptoms}</span>
              )}
            </div>

            <div className="severityType">
              <label>Severity Type*</label>
              <input
                type="radio"
                value="high"
                name="severity"
                checked={this.state.severityType === "high"}
                onChange={this.radioChangeHandler}
              />
              High
              <input
                type="radio"
                value="medium"
                name="severity"
                checked={this.state.severityType === "medium"}
                onChange={this.radioChangeHandler}
              />
              Medium
              <input
                type="radio"
                value="low"
                name="severity"
                checked={this.state.severityType === "low"}
                onChange={this.radioChangeHandler}
              />
              Low
            </div>

            <div className="pestOptions">
              <label htmlFor="pestOptions">Caused By*</label>
              <select
                name="pestOptions"
                value2={this.state.value}
                onChange={this.handlePestSelect}
                multiple
              >
                {this.getPestOptions()}
              </select>
            </div>

            <div className="cures">
              <label htmlFor="cures">Cures*</label>
              <textarea
                className={formErrors.cures.length > 10 ? "error" : null}
                placeholder="Preventive Measures"
                name="cures"
                noValidate
                value={this.state.cures}
                onChange={this.handleChange}
              />
              {formErrors.cures.length > 0 && (
                <span className="errorMessage">{formErrors.cures}</span>
              )}
            </div>

            <div className="container">
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
            <div className="submit">
              <button type="submit">
                {this.state.editMode ? "Update" : "Add Disease"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddDisease;
