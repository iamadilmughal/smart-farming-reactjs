import React, { useState } from "react";
import { Layout, Header, Navigation, Drawer, Content, Footer } from "react-mdl";
import "./App.css";
import Main from "./components/main";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from "./components/auth";
import {
  faDatabase,
  faPlusCircle,
  faHome,
  faQuestion,
  faMailBulk,
  faPhone,
  faSignInAlt,
  faComment,
  faPaperPlane,
  faLeaf,
  faChartPie,
  faSignOutAlt,
  faTree,
  faBug,
  faUser,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const showNavigation = () => {
    if (!Auth.isAuthenticated()) {
      return (
        <Navigation>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} style={{ marginRight: "10px" }} />
            Home
          </Link>
          <Link to="/message">
            <FontAwesomeIcon
              icon={faMailBulk}
              style={{ marginRight: "10px" }}
            />
            Send Message
          </Link>
          <Link to="/faq">
            <FontAwesomeIcon
              icon={faQuestion}
              style={{ marginRight: "10px" }}
            />
            FAQ
          </Link>
          <Link to="/forum">
            <FontAwesomeIcon icon={faComment} style={{ marginRight: "10px" }} />
            Community
          </Link>
          <Link
            to={Auth.isAuthenticated() ? "/logout" : "/alogin"}
            style={{ backgroundColor: "white", color: "green" }}
          >
            <FontAwesomeIcon
              icon={Auth.isAuthenticated() ? faSignOutAlt : faSignInAlt}
              style={{ marginRight: "10px" }}
            />
            {Auth.isAuthenticated() ? "Logout" : "Login"}
          </Link>
        </Navigation>
      );
    } else if (Auth.isAuthenticated(true)) {
      return (
        <Navigation>
          <Link to="/dashboard">
            <FontAwesomeIcon
              icon={faChartPie}
              style={{ marginRight: "10px" }}
            />
            Dashboard
          </Link>
          <Link to="/viewPlants">
            <FontAwesomeIcon icon={faTree} style={{ marginRight: "10px" }} />
            Plants
          </Link>
          <Link to="/viewPests">
            <FontAwesomeIcon icon={faBug} style={{ marginRight: "10px" }} />
            Pests
          </Link>
          <Link to="/forum">
            <FontAwesomeIcon icon={faComment} style={{ marginRight: "10px" }} />
            Community
          </Link>
          <Link to="/viewUsers">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
            View Farmers
          </Link>
          <Link to="/viewExperts">
            <FontAwesomeIcon
              icon={faUserGraduate}
              style={{ marginRight: "10px" }}
            />
            View Experts
          </Link>
          <Link to="/viewDiseases">
            <FontAwesomeIcon icon={faLeaf} style={{ marginRight: "10px" }} />
            View Diseases
          </Link>
          <Link
            to={Auth.isAuthenticated() ? "/logout" : "/alogin"}
            style={{ backgroundColor: "white", color: "green" }}
          >
            <FontAwesomeIcon
              icon={Auth.isAuthenticated() ? faSignOutAlt : faSignInAlt}
              style={{ marginRight: "10px" }}
            />
            {Auth.isAuthenticated() ? "Logout" : "Login"}
          </Link>
        </Navigation>
      );
    } else if (Auth.isAuthenticated()) {
      return (
        <Navigation>
          <Link to="/dashboard">
            <FontAwesomeIcon
              icon={faChartPie}
              style={{ marginRight: "10px" }}
            />
            Dashboard
          </Link>
          <Link to="/viewPlants">
            <FontAwesomeIcon icon={faTree} style={{ marginRight: "10px" }} />
            Plants
          </Link>
          <Link to="/viewPests">
            <FontAwesomeIcon icon={faBug} style={{ marginRight: "10px" }} />
            Pests
          </Link>
          <Link to="/forum">
            <FontAwesomeIcon icon={faComment} style={{ marginRight: "10px" }} />
            Community
          </Link>
          <Link to="/viewDiseases">
            <FontAwesomeIcon icon={faLeaf} style={{ marginRight: "10px" }} />
            View Diseases
          </Link>
          <Link
            to={Auth.isAuthenticated() ? "/logout" : "/alogin"}
            style={{ backgroundColor: "white", color: "green" }}
          >
            <FontAwesomeIcon
              icon={Auth.isAuthenticated() ? faSignOutAlt : faSignInAlt}
              style={{ marginRight: "10px" }}
            />
            {Auth.isAuthenticated() ? "Logout" : "Login"}
          </Link>
        </Navigation>
      );
    }
  };

  const showDrawer = () => {
    return (
      <Drawer
        title={
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Welcome
          </Link>
        }
      >
        <Navigation>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faChartPie} /> Dashboard{" "}
          </Link>

          <Link to="/viewPlants">
            <FontAwesomeIcon icon={faDatabase} /> View Plant Details{" "}
          </Link>
          <Link to="/addPlant">
            <FontAwesomeIcon icon={faPlusCircle} /> Add Plant Details
          </Link>
          <Link to="/pests">
            <FontAwesomeIcon icon={faDatabase} /> View Pest Details
          </Link>
          <Link to="/addPest">
            <FontAwesomeIcon icon={faPlusCircle} /> Add Pest Details
          </Link>
          <Link to="/addDisease">
            <FontAwesomeIcon icon={faPlusCircle} /> Add Disease
          </Link>
          <Link to="/viewUsers">
            <FontAwesomeIcon icon={faDatabase} /> View Users
          </Link>
          <Link to="/viewExperts">
            <FontAwesomeIcon icon={faDatabase} /> View Experts
          </Link>
          <Link to="/viewDiseases">
            <FontAwesomeIcon icon={faLeaf} /> View Diseaes
          </Link>
        </Navigation>
      </Drawer>
    );
  };
  return (
    <div className="demo-big-content">
      <Layout>
        <Header
          className="header-color"
          title={
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <FontAwesomeIcon icon={faLeaf} style={{ marginRight: "10px" }} />
              Smart Farming
            </Link>
          }
          scroll
        >
          {showNavigation()}
        </Header>
        {/* {showDrawer()} */}
        <Content>
          <div className="page-content" />
          <Main />
        </Content>
        <Footer className="footer">
          <div className="footer-div">
            <p>© 2020 - Smart Farming - COMSATS University Islamabad</p>
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
