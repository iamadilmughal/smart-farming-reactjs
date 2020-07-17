import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlayCircle,
  faAppleAlt
} from "@fortawesome/free-solid-svg-icons";
import "./landing.css";

class landing extends Component {
  render() {
    return (
      <div className="mainBody">
        <div className="headerSection">
          <div className="overlayHeader">
            <div className="headerMainDiv">
              <h1>
                Welcome to
                <span className="titleText">Smart Farming</span>
              </h1>
              <hr />
              <p>
                Introducing Smart Farming, an assistant to farmers that will
                help them in detection of diseases, weeds and pests in their
                plants and keep them updated about the weather conditions. This
                system will also alert the farmers if there is some disease
                detected in the nearby area. Smart Farming is a service that
                will help farmers in maintaining their farms and increasing
                production.
              </p>

              <button className="headerBtn">
                <FontAwesomeIcon
                  icon={faDownload}
                  style={{ marginRight: "10px" }}
                />
                Download the App
              </button>
            </div>
          </div>
        </div>

        <div className="stepsDiv">
          <div className="overlaySteps">
            <h2 className="stepSectionHeading">How This Works</h2>

            <div className="singleStep">
              <img
                src={require("../assets/capture.png")}
                className="stepImage"
                alt="Capture"
              />
              <h4 className="stepHeading">Capture Image</h4>
              <p className="stepDescription">
                Capture Image of the Suspected Leaf From Your Camera
              </p>
            </div>

            <div className="singleStep">
              <img
                src={require("../assets/upload.png")}
                className="stepImage"
                alt="Capture"
              />
              <h4 className="stepHeading">Upload Image</h4>
              <p className="stepDescription">
                After the image has been captured, upload it using our app
              </p>
            </div>

            <div className="singleStep">
              <img
                src={require("../assets/detect.png")}
                className="stepImage"
                alt="Capture"
              />
              <h4 className="stepHeading">Let the System Detect</h4>
              <p className="stepDescription">
                Our System will Detect any Pests or Diseases in the Uploaded
                image
              </p>
            </div>

            <div className="singleStep">
              <img
                src={require("../assets/result.png")}
                className="stepImage"
                alt="Capture"
              />
              <h4 className="stepHeading">View Results</h4>
              <p className="stepDescription">
                After the system has processed the image, you can view the
                results
              </p>
            </div>
          </div>
        </div>

        <div className="downloadAppDiv">
          <h2 className="downloadDivHeading">Download the App Now</h2>
          <div className="downloadBtnDiv">
            <img
              className="downloadBtn"
              src={require("../assets/getonappstore.png")}
              alt="Download on App Store"
            />
            <img
              className="downloadBtn"
              src={require("../assets/getonplaystore.png")}
              alt="Download on Play Store"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default landing;
