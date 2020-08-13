import React, { Component } from "react";
import "./addPlant.css";
import Axios from "axios";
import { useAlert } from "react-alert";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  return valid;
};

class AddPlant extends Component {
   
 
  constructor(props) {
    super(props);
    this.handleChange2 = this.handleDiseaseSelect.bind(this);

    this.state = {
      _id: "",
      name: "",
      season: "winter",
      diseases: [],
      pests: [],
      description: null,
      selectedFile: "",
      selectedFileURL: "",
      pestOptions: [],
      formErrors: {
        name: "",
        description: "",
      },
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id != null) {
      Axios.get("https://smart-farming-backend.herokuapp.com/plant/" + id)
        .then((response) => {
          console.log(response.data);
          this.setState({
            editMode: true,
            _id: id,
            name: response.data.plantName,
            season: response.data.season,
            diseases: response.data.diseases,
            pests: response.data.pests,
            description: response.data.description,
            selectedFileURL: response.data.plantImage,
            // selectedFile: new File(response.data.diseaseImage, response.data.diseaseName),
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    this.loadPestOptions();
  }
  handleDiseaseSelect(event) {
    event.preventDefault();
    console.log(event);
    // this.setState({ seasson: event.target.value });
  }

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
      pests: value,
    });
    console.log(this.state);
  };

  onChangeHandler = (event) => {
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
      let data = new FormData();

      console.log("Here");
      data.append("name", this.state.name);
      data.append("season", this.state.season);
      data.append("diseases", this.state.diseases);
      data.append("pests", this.state.pests);
      data.append("description", this.state.description);
      data.append("plantImage", this.state.selectedFile);

      console.log(data);
      // alert(data);

      if (this.state.editMode) {
        data.append("id", this.state._id);
        Axios.put("https://smart-farming-backend.herokuapp.com/plant", data)
          .then((res) => {
            if (res.data.status === 1) {
              alert("Plant Updated Successfully");
              this.props.history.push("/viewPlants")
            } else {
              console.log("Error Occured" + res.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Axios.post("https://smart-farming-backend.herokuapp.com/plant", data)
          .then((res) => {
            console.log(res)
            if (res.status === 200) {
              alert("Plant Added Successfully");
              this.props.history.push("/viewPlants")
            } else {
              console.log("Error Occured" + res.data.message);
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
    Axios.get("https://smart-farming-backend.herokuapp.com/pest/")
      .then((response) => {
        this.setState({ pestOptions: response.data.result });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getPestOptions() {
    return this.state.pestOptions.map((pestOption, index) => {
      const { pestName, _id } = pestOption; //destructuring
      return (
        <option key={_id} value2={_id}>
          {pestName}
        </option>
      );
    });
  }

  handleChange = (e) => {
    console.log(this.state);
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
              this.state.selectedFileURL === ""
                ? require("../assets/plant-image.png")
                : this.state.selectedFileURL
            }
            alt="Plant"
          />
        </div>
        <div className="form-wrapper-right-form">
        <h1 className="page-heading">
            {this.state.editMode
              ? "Update Plant Details"
              : "Add Plant Details"}
          </h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="plantName">
              <label htmlFor="name">Plant Name*</label>
              <input
                className={formErrors.name.length > 0 ? "error" : null}
                placeholder="Plant Name"
                type="text"
                name="name"
                value={this.state.name}
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>

            <div className="season">
              <label htmlFor="season">Select Season*</label>
              <select
                name="season"
                onChange={this.handleChange}
              >
                <option
                  selected={this.state.season === "winter"}
                  onSelect={() => {
                    this.setState({ season: "winter" });
                  }}
                  value="winter"
                >
                  Winter
                </option>
                <option
                  selected={this.state.season === "summer"}
                  onSelect={() => {
                    this.setState({ season: "summer" });
                  }}
                  value="summer"
                >
                  Summer
                </option>
                <option
                  selected={this.state.season === "autumn"}
                  onSelect={() => {
                    this.setState({ season: "autumn" });
                  }}
                  value="autumn"
                >
                  Autumn
                </option>
                <option
                  selected={this.state.season === "spring"}
                  onSelect={() => {
                    this.setState({ season: "spring" });
                  }}
                  value="spring"
                >
                  Spring
                </option>
              </select>
            </div>

            <div className="description-plant">
              <label htmlFor="description">Description*</label>
              <textarea
                className={formErrors.description.length > 0 ? "error" : null}
                placeholder="Description"
                type="text"
                name="description"
                value={this.state.description}
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
            </div>
            <div>
              <div className="pest">
                <label htmlFor="pest">Select Pest*</label>
                <select
                  name="3"
                  value2={this.state.season}
                  onChange={this.handlePestSelect}
                  multiple
                >
                  {this.getPestOptions()}
                </select>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group files">
                    <label>Upload a Plant Picture</label>
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
              <button type="submit">
                {this.state.editMode ? "Update Plant" : "Add Plant"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddPlant;
