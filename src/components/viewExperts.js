import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSort,
  faMinusCircle,
  faPlusCircle,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./viewExperts.css";
import Axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import { useAlert } from "react-alert";

function ViewExperts() {
  const [list, setList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);
  const [role, setRole] = useState("expert");

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
    axios
      .get("http://localhost:3000/admin")
      .then((response) => {
        console.log(response.data);
        setAdminList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const columnsExperts = [
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
              deleteUser(row.username);
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

  const columnsAdmin = [
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
      name: "Edit",
      selector: "editAction",
      sortable: false,
      maxWidth: "5%",
      cell: (row) => (
        <div>
          <Link to={"/edit/admin/" + row.username}>
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
              deleteUser(row.username, true);
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

  const deleteUser = (uname, isAdmin) => {
    if (!window.confirm("Are you sure you wish to delete this item?")) {
      return;
    }
    if (isAdmin) {
      Axios.delete("http://localhost:3000/admin/" + uname)
        .then((response) => {
          if (response.data.status === 1) {
            alert.show("Admin Deleted Successfully");
          } else {
            alert.show("Some Error Occured. Not Deleted");
          }
        })
        .catch((error) => {
          console.log(error);
          alert.show("Some Error Occured", { title: "Error" });
        });
      return;
    } else {
      Axios.delete("http://localhost:3000/expert/" + uname)
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
    }
  };

  const onSearchHandler = (event) => {
    var query = event.target.value.toLowerCase();
    if (role === "expert") {
      setCurrentResults(
        list.filter(
          (x) =>
            x.username.toLowerCase().includes(query) ||
            x.name.toLowerCase().includes(query)
        )
      );
    } else {
      setCurrentResults(
        adminList.filter(
          (x) =>
            x.username.toLowerCase().includes(query) ||
            x.name.toLowerCase().includes(query)
        )
      );
    }
  };

  const roleChange = (event) => {
    var roleSelected = event.target.value;
    setRole(roleSelected);
    if (roleSelected === "expert") {
      setCurrentResults(list);
    } else {
      setCurrentResults(adminList);
    }
    console.log(roleSelected);
  };

  return (
    <div className="view-page-body">
      <div className="view-page-card">
        <select
          name="role-selector"
          className="role-selector"
          onChange={roleChange}
        >
          <option selected value="expert">
            Expert
          </option>
          <option value="admin">Admin</option>
        </select>
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
            columns={role == "expert" ? columnsExperts : columnsAdmin}
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
