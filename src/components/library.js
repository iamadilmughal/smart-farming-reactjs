import React from "react";
import "./library.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserAlt,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";



class Library extends React.Component {
  constructor() {
    super();
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("https://smart-farming-backend.herokuapp.com/community")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  todoList() {
    return this.state.todos.map((todos, index) => {
      const {
        _id,
        postTitle,
        postDescription,
        datePosted,
        postedBy,
        image
      } = todos; //destructuring
      return (
        <div className="itemCard">
          <img src={image} width="100%" height ="200px" alt={postTitle}/>
          <a className="itemTitleLink" href={"/post/" + _id}>
            <h6 className="itemTitle">{postTitle}</h6>
          </a>
          {/* <h6>{this.trunString(postDescription)}</h6> */}
          <p>
            <FontAwesomeIcon icon={faCalendarAlt} /> Posted on:{" "}
            {new Date(Number(datePosted)).toDateString()}
          </p>
          <p>
            <FontAwesomeIcon icon={faUserAlt} /> Posted By: {postedBy}
          </p>
        </div>
      );
    });
  }

  trunString(s) {
    if (s.length > 200) {
      return s.substring(0, 199) + "...";
    }
    return s;
  }

  render() {
    // var {comments} = this.state;
    return (
      <div className="body">
        <h1>Form Posts</h1>
        <a href="/write" className="float">
          <div className="my-float">
            <FontAwesomeIcon icon={faPlusCircle} className="f_a_icon" />
            Add a New Post
          </div>
        </a>
        {this.todoList()}
      </div>
    );
  }
}

export default Library;
