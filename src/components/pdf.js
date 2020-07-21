import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./pdf.css";
import html2canvas from "html2canvas";
import Button from "@material-ui/core/Button";
// import Grid from '@material-ui/core/Grid';
import DataTable from "react-data-table-component";
// import { Typography } from '@material-ui/core';
// import { RepeatOneSharp } from '@material-ui/icons';
// import moment from "moment";
import { Link } from "react-router-dom";

const columns = [
  {
    name: "Detection Image",
    selector: "imageURL",
    cell: (row) => (
      <div>
        <img className="row-image" src={row.imageURL} alt={row.Predicted} />
      </div>
    ),
    sortable: false,
    maxWidth: "10%",
  },

  {
    name: "Disease Detected",
    selector: "Prediction",
    maxWidth: "15%",
  },
  {
    name: "Date",
    selector: "DatePublished",
    maxWidth: "15%",
  },
  {
    name: "Detected By",
    selector: "Farmer",
    maxWidth: "15%",
  },
];

export default class PDFShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Diagnosis Fields
      data: this.props.location.passed.data,
    };
    this.printDocument = this.printDocument.bind(this);
  }
  printDocument() {
    const input = document.getElementById("pdfdiv");
    window.html2canvas = html2canvas;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      // width:'100%'
      // format: [4, 2]
    });
    pdf.html(input, {
      callback: function (doc) {
        console.log("in callback");
        doc.save("download.pdf");
      },
    });
    //     html2canvas(input)
    //         .then((canvas) => {
    //             var imgWidth = 200;
    //             var pageHeight = 290;
    //             var imgHeight = canvas.height * imgWidth / canvas.width;
    //             var heightLeft = imgHeight;
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF({
    //                 orientation: "portrait",
    //                 unit: "px"
    //                 // format: [4, 2]
    //             })
    //             // var position = -110;
    //             // var heightLeft = imgHeight;
    //             // pdf.addImage(imgData, 'JPEG', 0, -1000, imgWidth, imgHeight);
    //             // pdf.save("download.pdf");
    //             pdf.html(input, {
    //                 callback: function (doc) {
    //                     console.log("in callback");
    //                     doc.save("download.pdf");
    //                 }
    //             });
    //         });
  }

  async componentDidMount() {
    try {
      const tok = localStorage.getItem("token");
      // const profile = JSON.parse(localStorage.getItem('profile'));
      // const Did = profile._id;
      const Pid = this.props.location.passed.Patient_ID;
      const Diagnosis_ID = this.props.location.passed.Diagnosis_ID;
      console.log(Pid + "    " + Diagnosis_ID + "      " + tok);
      await fetch("http://localhost:8000/api/auth/diagnose/" + Diagnosis_ID, {
        method: "GET",
        headers: {
          "x-access-token": tok,
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.setState({
            tests: response.Tests,
            medicines: response.Medicines,
            medicine_notes: response.Medicine_Notes,
            diseases: response.Findings,
            reco_foods: response.Recommended_Foods,
            prev_foods: response.Preventive_Foods,
            comments: response.Comments,
            diet_notes: response.Diet_Note,
            Diagnose_Date: response.Date,
            Symptoms: response.Symptoms,
          });
          // Fetch Patient data
          fetch("http://localhost:8000/api/auth/patients/" + Pid, {
            method: "GET",
            headers: {
              "x-access-token": tok,
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((response) => response.json())
            .then((res) => {
              console.log("Patient DAta");
              console.log(res[0].Name);
              this.setState({
                Name: res[0].Name,
                Email: res[0].Email,
                Phone_Number: res[0].Phone_Number,
                DOB: res[0].DOB,
                Gender: res[0].Gender,
                Blood_Group: res[0].Blood_Group,
                Pulse: res[0].Pulse,
                Allergies: res[0].Allergies,
                Operations: res[0].Operation,
                Comorbidity: res[0].Comorbidity,
                Height: res[0].Height,
                Weight: res[0].Weight,
              });
            });
        });
    } catch (error) {}
  }
  render() {
    return (
      <div className="pdf-main-div" id="pdf-main-div">
        <div id="pdf-div-to-print">
          <div
            id="pdfdiv"
            style={{ fontSize: "3px"}}
          >
            <h3 className="dashboard-div-heading">Recent Detections</h3>

            <DataTable
              columns={columns}
              data={this.state.data}
              className="item-data-table"
              noHeader
              pagination
            />
          </div>
        </div>

        <Button
          style={{ marginLeft: "12%" }}
          onClick={this.printDocument}
          variant="contained"
          color="primary"
        >
          {" "}
          Generate PDF{" "}
        </Button>
        <Button
          style={{ marginLeft: "2%" }}
          component={Link}
          to="./dashboard"
          variant="contained"
          color="secondary"
        >
          {" "}
          Back{" "}
        </Button>
      </div>
    );
  }
}
