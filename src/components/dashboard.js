import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import "./dashboard.css";
import DataTable from "react-data-table-component";

import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBug,
  faLeaf,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";

// import { Link, Redirect } from "react-router-dom";
// import ReactToPrint from "react-to-print";

const columns = [
  {
    name: "Detection Image",
    selector: "diseaseImage",
    cell: (row) => (
      <div>
        <img
          className="row-image"
          src={row.diseaseImage}
          alt={row.diseaseName}
        />
      </div>
    ),
    sortable: false,
  },
  {
    name: "Disease Detected",
    selector: "diseaseName",
  },
  {
    name: "Date",
    selector: "dateDetected",
  },
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      latestDetections: [],
    };
    this.token = localStorage.getItem("token");
  }
  componentDidMount() {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.token,
    };

    Axios.get("http://localhost:3000/disease/")
      .then((response) => {
        this.setState({ latestDetections: response.data.DiseasesFound });
        console.log(response.data.DiseasesFound);
        // alert.show("Data Loaded Successfully", {
        //   title: "Data Has been Loaded",
        // });
      })
      .catch(function (error) {
        console.log(error);
      });

    Axios.get(
      "https://smartfarmingnodeserver.herokuapp.com/plant/plantreport",
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
                label: "Customers",
                data: data_,
                backgroundColor: ["#006400", "#B21F00", "#C9DE00", "#2FDE00"],
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
            <h2 className="number-count">12</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faUser} />
              Total Users
            </h5>
          </div>
          <div className="number-div">
            <h2 className="number-count">42</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faBug} />
              Total Pests
            </h5>
          </div>
          <div className="number-div">
            <h2 className="number-count">30</h2>
            <h5 className="number-heading">
              <FontAwesomeIcon className="number-icon" icon={faLeaf} />
              Total Plants
            </h5>
          </div>
          <div className="number-div">
            <h2 className="number-count">32</h2>
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
              noHeader
              pagination
            />
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            {
              <div>
                <Doughnut
                  data={this.state.chartData}
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
