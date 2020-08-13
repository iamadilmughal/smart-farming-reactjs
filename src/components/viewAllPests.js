import React, { useState, useEffect } from "react";
import "./viewAllPests.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faPlus,
  faEye,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

function ViewAllPests() {
  const [todos, setTodos] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);

  const alert = useAlert();

  const columns = [
    {
      name: "Pest Image",
      selector: "pestImage",
      cell: (row) => (
        <div>
          <img className="row-image" src={row.pestImage} alt={row.pestImage} />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Pest Name",
      selector: "pestName",
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
          <Link to={"/item/pest/" + row._id}>
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
          <Link to={"/editPest/" + row._id}>
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
      cell: (row) => (
        <div className="table-button-cell">
          <button
            className="table-delete-button table-button"
            onClick={() => {
              deletePest(row._id);
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

  const deletePest = (id) => {
    console.log("Clicked");
    axios
      .delete("https://smart-farming-backend.herokuapp.com/pest/" + id)
      .then((response) => {
        if (response.data.status == 1) {
          alert.show("Pest Deleted Successfully");
        } else {
          alert.show("Some Error Occured. Not Deleted");
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
          x.pestName.toLowerCase().includes(query) ||
          x.severity.toLowerCase().includes(query)
      )
    );
  };

  useEffect(() => {
    axios
      .get("https://smart-farming-backend.herokuapp.com/pest/")
      .then((response) => {
        setTodos(response.data.result);
        setCurrentResults(response.data.result);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="view-page-body">
      <div className="view-page-card">
      <h1 className="view-page-heading"> Pest List</h1>
      <Link to="/addPest">
        <button className="add-item-button">
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
          Add New Pest
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
          highlightOnHover
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

export default ViewAllPests;
