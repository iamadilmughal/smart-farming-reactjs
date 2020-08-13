import React, { Component, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import "./viewDiseases.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faSort,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";

import { Link } from "react-router-dom";
import { Button } from "react-mdl";

function ViewDisease() {
  const [todos, setTodos] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);

  const alert = useAlert();

  const columns = [
    {
      name: "Disease Image",
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
      name: "Disease Name",
      selector: "diseaseName",
      sortable: true,
      maxWidth: "20%",
    },
    {
      name: "Severity",
      selector: "severity",
      sortable: true,
    },
    {
      name: "View",
      selector: "viewAction",
      sortable: false,
      maxWidth: "5%",
      cell: (row) => (
        <div>
          <Link to={"/item/disease/" + row._id}>
            <button className="table-view-button table-button">
              <FontAwesomeIcon
                className="view-icon table-button-icon"
                icon={faEye}
              />
            </button>
          </Link>
        </div>
      ),
    },
    {
      name: "Edit",
      selector: "editAction",
      sortable: false,
      maxWidth: "5%",
      cell: (row) => (
        <div>
          <Link to={"/editDisease/" + row._id}>
            <button className="table-edit-button table-button">
              <FontAwesomeIcon
                className="view-icon table-button-icon"
                icon={faPencilAlt}
              />
            </button>
          </Link>
        </div>
      ),
    },
    {
      name: "Delete",
      selector: "deleteAction",
      sortable: false,
      maxWidth: "5%",
      compact: true,
      cell: (row) => (
        <div className="table-button-cell">
          <button
            className="table-delete-button table-button"
            onClick={() => {
              deleteDisease(row._id);
            }}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="table-button-icon"
              style={{ marginRight: "10px" }}
            />
          </button>
        </div>
      ),
    },
  ];

  const deleteDisease = function (id) {
    if (!window.confirm("Are you sure you wish to delete this item?")) {
      return;
    }
    console.log("Clicked");
    axios
      .delete("https://smart-farming-backend.herokuapp.com/disease/" + id)
      .then((response) => {
        if (response.data.status === 1) {
          alert.success("Disease Deleted Successfully", { title: "Success" });
        } else {
          alert.error("Some Error Occured. Not Deleted", { title: "Error" });
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Some Error Occured");
      });
  };

  const onSearchHandler = (event) => {
    var query = event.target.value.toLowerCase();
    setCurrentResults(
      todos.filter(
        (x) =>
          x.diseaseName.toLowerCase().includes(query) ||
          x.description.toLowerCase().includes(query) ||
          x.severity.toLowerCase().includes(query)
      )
    );
  };

  useEffect(() => {
    axios
      .get("https://smart-farming-backend.herokuapp.com/disease/")
      .then((response) => {
        setTodos(response.data.DiseasesFound);
        setCurrentResults(response.data.DiseasesFound);
        console.log(response.data.DiseasesFound);
        // alert.show("Data Loaded Successfully", {
        //   title: "Data Has been Loaded",
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="view-page-body">
      <div className="view-page-card">
        <h1 className="view-page-heading">Diseases</h1>
        <Link to="/addDisease">
          <button className="add-item-button">
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
            Add New Diseasse
          </button>
        </Link>

        <div className="data-table-div">
          <input
            type="text"
            onChange={onSearchHandler}
            placeholder="Enter here to Search"
          />

          <DataTable
            columns={columns}
            data={currentResults}
            noHeader
            compact
            className="item-data-table"
            sortIcon={
              <FontAwesomeIcon icon={faSort} style={{ marginRight: "10px" }} />
            }
            pagination
          />
        </div>
      </div>
    </div>
  );
}

export default ViewDisease;
