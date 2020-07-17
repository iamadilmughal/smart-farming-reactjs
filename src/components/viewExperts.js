import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faSort,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./viewExperts.css";
import Axios from "axios";
import DataTable, {createTheme} from "react-data-table-component";
import { useAlert } from "react-alert";

function ViewExperts() {
  const [list, setList] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);

  const alert = useAlert();

  useEffect(() => {
    axios
      .get("http://localhost:3000/expert")
      .then((response) => {
        console.log(response.data);
        setList(response.data);
        setCurrentResults(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onSearchHandler = (event) => {
    var query = event.target.value.toLowerCase();
    setCurrentResults(
      list.filter(
        (x) =>
          x.username.toLowerCase().includes(query) ||
          x.name.toLowerCase().includes(query)
      )
    );
  };

  const columns = [
    {
      name: "Image",
      selector: "profileImage",
      cell: (row) => (
        <div>
          <img className="row-image" src={row.picturePath} alt={row.username} />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Expert Name",
      selector: "name",
      sortable: true,
      maxWidth: "20%",
    },
    {
      name: "Username",
      selector: "username",
      sortable: true,
    },
    {
      name: "Rating",
      selector: "rating",
      sortable: true,
      cell: (row) => (
        <div>
          <FontAwesomeIcon
            className="downrate-icon"
            icon={faMinusCircle}
            onClick={() => {
              changeRating(false, row.username);
            }}
          />
          {row.rating}
          <FontAwesomeIcon
            className="uprate-icon"
            icon={faPlusCircle}
            onClick={() => {
              changeRating(true, row.username);
            }}
          />
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
          <Link to={"/edit/expert/" + row.username}>
            <FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />
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
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ marginRight: "10px" }}
            onClick={() => {
              deleteExpert(row.username);
            }}
          />
        </div>
      ),
    },
  ];

  const changeRating = (uprate, uname) => {
    var url = "http://localhost:3000/expert/downrate/";
    if (uprate) {
      url = "http://localhost:3000/expert/uprate/";
    }
    Axios.put(url, { username: uname })
      .then((response) => {
        if (response.data.status === 1) {
          alert.show(response.data.message, { title: "Success" });
        } else {
          alert.show("Some Error Occured. Not Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
        alert.show("Some Error Occured");
      });
  };

  const deleteExpert = (uname) => {
    console.log("Clicked");
    Axios.delete("http://localhost:3000/expert/delete/" + uname)
      .then((response) => {
        if (response.data.status === 1) {
          alert.show("Expert Deleted Successfully");
        } else {
          alert.show("Some Error Occured. Not Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Some Error Occured");
      });
  };

  return (
    <div className="view-page-body">
      <div className="view-page-card">

      <h1 className="view-page-heading">View Experts</h1>
      <Link to="/reg">
        <button className="add-item-button">
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
          Add New Expert
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
          className="item-data-table"
          noHeader
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

export default ViewExperts;
