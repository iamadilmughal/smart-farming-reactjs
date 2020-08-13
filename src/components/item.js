import React, { useState, useEffect } from "react";
import "./item.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationCircle,
  faBug,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Item(props) {
  const [type, setType] = useState("");
  const [item, setItem] = useState([]);
  const [causedBy, setCausedBy] = useState([]);
  var {
    itemName,
    itemDescription,
    symptoms,
    image,
    scientificName,
    severity,
    itemSeason,
  } = "";
  var cures = [];

  useEffect(() => {
    let id = props.match.params.id;
    setType(props.match.params.type);
    // console.log(id);
    // console.log(props.match.params.type);

    axios
      .get("https://smart-farming-backend.herokuapp.com/" + props.match.params.type + "/" + id)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
        if (props.match.params.type === "disease") {
          axios
            .post("https://smart-farming-backend.herokuapp.com/pest/list/", {
              list: response.data.causedBy,
            })
            .then((response) => {
              console.log(response.data.result);
              setCausedBy(response.data.result);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (type === "disease") {
    itemName = item.diseaseName;
    itemDescription = item.description;
    cures = item.cures;
    symptoms = item.symptoms;
    image = item.diseaseImage;
    severity = item.severity;
  } else if (type === "pest") {
    itemName = item.pestName;
    itemDescription = item.description;
    cures = item.prevention;
    symptoms = item.diagnostics;
    image = item.pestImage;
    severity = item.severity;
    scientificName = item.scientificName;
  } else if (type === "plant") {
    itemName = item.plantName;
    itemDescription = item.description;
    itemSeason = item.season;
    image = item.plantImage;
    // var pests = item.pests;
    // if (pests) {
    //   setCausedBy(pests);
    // }
  }

  const sidebar = () => {
    var items = causedBy.map((item, key) => (
      <Link className="no-decor" to={"/item/pest/" + item._id} key={item._id}>
        <FontAwesomeIcon
          className="item-heading-icon"
          icon={faAngleRight}
          color="#6ec259"
        />
        {item.pestName}
        <br />
      </Link>
    ));

    return (
      <div className="item-sidebar-div">
        <div className="item-causedby-div">
          <h4 className="sidebar-div-heading">
            <FontAwesomeIcon
              className="item-heading-icon"
              icon={type === "disease" ? faBug : faBug}
            />
            {type === "disease" ? "Caused By" : "Scientific Name"}
          </h4>
          <p className="item-div-content">
            {type === "disease" ? items : scientificName}
          </p>
        </div>
      </div>
    );
  };

  const sympsAndCures = () => {
    return (
      <div>
        <div className="item-symp-div">
          <h3 className="item-div-heading">
            <FontAwesomeIcon
              className="item-heading-icon"
              icon={faExclamationCircle}
            />
            {type === "disease" ? "Symptoms" : "Diagnostics"}
          </h3>
          <p className="item-div-content">{symptoms}</p>
        </div>
        <div className="item-cures-div">
          <h3 className="item-div-heading">
            <FontAwesomeIcon
              className="item-heading-icon"
              icon={faCheckCircle}
            />
            Cures
          </h3>
          <p className="item-div-content">{cures}</p>
        </div>
      </div>
    );
  };

  const postBody = () => {
    return (
      <div className="item-body-div">
        <div className="item-heading-div">
          <h3 className="page-heading">{itemName}</h3>
        </div>
        <div className="item-image-div">
          <img className="item-image" src={image} alt={itemName} />
        </div>
        <div className="item-desc-div">
          <h3 className="item-div-heading">
            <FontAwesomeIcon
              className="item-heading-icon"
              icon={faInfoCircle}
            />
            Description
          </h3>
          <p className="item-div-content">{itemDescription}</p>
        </div>
        {type == "plant" ? "" : sympsAndCures()}
      </div>
    );
  };

  return (
    <div className="item-page-body">
      {type == "plant" ? "" : sidebar()}
      {postBody()}
    </div>
  );
}

export default Item;
