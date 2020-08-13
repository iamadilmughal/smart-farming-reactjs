import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./dashboard.css";
import DataTable from "react-data-table-component";
import ListItemLink from "./ListItemLink";

import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBug,
  faLeaf,
  faMobile,
  faHandMiddleFinger,
  faQuestion,
  faStarOfLife,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// import { Link, Redirect } from "react-router-dom";
// import ReactToPrint from "react-to-print";

const columns = [
  {
    name: "Detection Image",
    selector: "imageURL",
    cell: (row) => (
      <div>
        <img className="row-image" src={row.ImageURL} alt={row.Prediction} />
      </div>
    ),
    sortable: false,
  },
  {
    name: "Type",
    selector: "Detected",
    cell: (row) => (
      <div>
        <FontAwesomeIcon
          icon={
            row.Detected == "Plant Disease"
              ? faLeaf
              : row.Detected == "Pests"
              ? faBug
              : faStarOfLife
          }
        />
      </div>
    ),
  },
  {
    name: "Disease Detected",
    selector: "Prediction",
  },
  {
    name: "Date",
    selector: "DatePublished",
  },

  {
    name: "Feedback",
    selector: "FeedBack",
    cell: (row) => (
      <div>
        <p>
          {row.FeedBack ? row.FeedBack + "\t" : "N/A"}
          {row.FeedBack ? <FontAwesomeIcon icon={faStar} /> : ""}
        </p>
      </div>
    ),
  },

  {
    name: "Detected By",
    selector: "Farmer",
  },
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      latestDetections: [],
      pestCount: 0,
      plantCount: 0,
      diseaseCount: 0,
      feedbackCount: 0,
    };
    this.token = localStorage.getItem("token");
  }
  componentDidMount() {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token,
    };

    // Fetching Stats Data
    Axios.get(
      "https://smartfarmingnodeserver.herokuapp.com/dashboard/getStats"
    ).then((response) => {
      console.log("Stats Response");
      console.log(response);
      this.setState({
        plantCount: response.data.plants,
        pestCount: response.data.pests,
        diseaseCount: response.data.diseasees,
        feedbackCount: response.data.feedbacks,
      });
    });

    Axios.get("https://smartfarmingnodeserver.herokuapp.com/feedback")
      .then((response) => {
        this.setState({
          latestDetections: response.data.results,
          feedbackCount: response.data.results.length,
        });
        console.log(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });

    Axios.get(
      "https://smartfarmingnodeserver.herokuapp.com/feedback/plantreport",
      { headers: headers }
    ) //check the localhost link

      .then((res) => {
        console.log(res);
        let labels_ = [];
        let data_ = [];

        for (const dataObj of res.data) {
          labels_.push(dataObj._id);

          data_.push(dataObj.count);
        }
        this.setState({
          chartData: {
            labels: labels_,
            datasets: [
              {
                label: "Detections",
                data: data_,
                backgroundColor: [
                  "#3949ab ",
                  "#2196f3",
                  "#26c6da",
                  "#d4e157",
                  "#673ab7",
                  "#e91e63",
                  "#66bb6a",
                  "#c0ca33",
                  "#fdd835",
                  "#3949ab",
                ],
                hoverBackgroundColor: [
                  "#501800",
                  "#4B5000",
                  "#175000",
                  "#003350",
                  "#35014F",
                ],
              },
            ],
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="content-wrapper dashboard-page-body">
        <section className="numbers-section">
          <div className="number-div">
            <h2 className="number-count">{this.state.diseaseCount}</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faLeaf} />
              Total Diseases
            </h5>
          </div>
          <div className="number-div">
            <h2 className="number-count">{this.state.pestCount}</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faBug} />
              Total Pests
            </h5>
          </div>
          <div className="number-div">
            <h2 className="number-count">{this.state.plantCount}</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faLeaf} />
              Total Plants
            </h5>
          </div>
          <div className="number-div">
            <h2 className="number-count">{this.state.feedbackCount}</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faMobile} />
              Total Detections
            </h5>
          </div>
        </section>
        <section className="recent-detections-section">
          <div className="recent-detections-div">
            <h3 className="dashboard-div-heading">Recent Detections</h3>

            <DataTable
              columns={columns}
              data={this.state.latestDetections}
              className="item-data-table"
              noHeader
              pagination
            />
            <ListItemLink
              to={{
                pathname: "/PDFShow",
                passed: { data: this.state.latestDetections },
              }}
              variant="contained"
              text="Generate PDF"
            />
          </div>
        </section>
        <section className="graph-secion">
          <div className="graph-secion-div">
            <h3 className="dashboard-div-heading">Detection Graph</h3>

            {
              <div className="chart-div">
                <Doughnut
                  data={this.state.chartData}
                  className="detection-chart"
                  options={{
                    title: {
                      display: true,
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            }
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
