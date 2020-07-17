import React, { Component } from "react";
import "./alogin.css";
import Axios from "axios";
import * as fire from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDkeSnOObjCEKe0BCsZhzlC3ysVL9oYftw",
  authDomain: "notifications-903a4.firebaseapp.com",
  databaseURL: "https://notifications-903a4.firebaseio.com",
  projectId: "notifications-903a4",
  storageBucket: "notifications-903a4.appspot.com"
};

// if(!fire.app.length){
fire.initializeApp(firebaseConfig);

// }

class SendNotification extends Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);

    this.state = {
      title: null,
      description: ""
    };
  }

  handleChange1(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log("helloooooooooooooooooo");
    fire
      .database()
      .ref("tokens/")
      .once("value", function(snapshot) {
        // console.log(snapshot.val())
        var tasks = [];
        snapshot.forEach(child => {
          const a = child.val().tok;
          console.log(a);

          let response = fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              to: a,
              sound: "default",
              title: "aur sunao",
              body: "mai thek tm btao!"
            })
          });
        });
      });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target; //destructuring both name and its value.
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  render() {
    return (
      <div className="wrapper1">
        <div className="form-wrapper">
          <h1>Send a Notification</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="title">
              <label htmlFor="title">Title*</label>
              <input
                placeholder="Title"
                type="text"
                name="title"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="description">
              <label htmlFor="description">Notification Content*</label>
              <textarea
                placeholder="Notifcation Content"
                name="description"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="submit">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SendNotification;
