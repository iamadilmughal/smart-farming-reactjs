import Axios from "axios";
import Cookies from "universal-cookie";
var md5 = require("md5");

class Auth {
  constructor() {
    this.authenticated = false;
    this.cookies = new Cookies();
  }

  async checkAdminCreds(username, password) {
    var data = {
      username,
      password: md5(password),
    };

    var toReturn = false;

    await Axios.post("http://localhost:3000/admin/login", data)
      .then((response) => {
        this.dataFetched = true;
        if (response.data.status === 0) {
          this.authenticated = false;
        }
        if (response.data.status === 1) {
          this.authenticated = true;
        }
      })
      .catch(function (error) {
        console.log(error);
        this.authenticated = false;
      });

    if (this.dataFetched === true) {
      return toReturn;
    }
  }

  async checkExpertCreds(username, password) {
    var data = {
      username: username,
      password: md5(password),
    };

    await Axios.post("http://localhost:3000/expert/login", data)
      .then((response) => {
        this.dataFetched = true;
        console.log(response.data);

        if (response.data.status === 1) {
          console.log("Correct Login");
          this.authenticated = true;
          return true;
        } else {
          // toReturn = false;
          this.authenticated = false;
          return false;
        }
      })
      .catch(function (error) {
        console.log(error);
        // this.authenticated = false;
        return false;
      });
  }

  async login(username, password, isAdmin) {
    if (isAdmin) {
      var isAuth = await this.checkAdminCreds(username, password);
      console.log(isAuth);
      if (this.authenticated === true) {
        // this.authenticated = true;
        localStorage.setItem("username", username);
        localStorage.setItem("type", "admin");
        localStorage.setItem("authenticated", "true");
        return true;
      } else {
        return false;
      }
    }
    var isAuth = await this.checkExpertCreds(username, password);
    console.log(isAuth);
    if (this.authenticated === true) {
      this.authenticated = true;
      localStorage.setItem("username", username);
      localStorage.setItem("type", "expert");
      localStorage.setItem("authenticated", "true");

      return true;
    } else {
      return false;
    }
  }

  logout() {
    if (
      localStorage.getItem("authenticated") == "true" &&
      localStorage.getItem("username") != null
    ) {
      console.log("Logout Called")
      this.authenticated = false;
      localStorage.removeItem("username");
      localStorage.removeItem("type");
      localStorage.removeItem("authenticated");
    }
    return true;
  }

  isAuthenticated(admin) {
    console.log(localStorage);
    if (admin) {
      return (
        // this.authenticated &&
        localStorage.getItem("authenticated") == "true" &&
        // localStorage.getItem("username") != null &&
        localStorage.getItem("type") === "admin"
      );
    }
    return localStorage.getItem("authenticated") == "true";
  }

  getUsername() {
    return localStorage.getItem("username");
  }
}

export default new Auth();
