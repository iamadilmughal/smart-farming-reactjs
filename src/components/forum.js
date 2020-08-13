import React from "react";
import "./posts.css";
import "./forum.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUserAlt,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

class Forum extends React.Component {
  constructor() {
    super();
    this.state = { todos: [], currentResults: [] };
  }

  componentDidMount() {
    axios
      .get("https://smart-farming-backend.herokuapp.com/community")
      .then((response) => {
        this.setState({ todos: response.data, currentResults: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  todoList() {
    return this.state.currentResults.map((todos, index) => {
      const { _id, postTitle, postDescription, datePosted, postedBy } = todos; //destructuring
      return (
        <div className="postCard">
          <a className="forum-post-title" href={"/post/" + _id}>
            <h4>{postTitle}</h4>
          </a>
          <h6>{this.trunString(postDescription)}</h6>
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

  
  onSearchHandler = (event) => {
    var query = event.target.value.toLowerCase();
    this.setState({
      currentResults:this.state.todos.filter(
        (x) =>
          x.postTitle.toLowerCase().includes(query) ||
          x.postDescription.toLowerCase().includes(query) ||
          x.postedBy.toLowerCase().includes(query) 
      )
    }
    );
  };

  trunString(s) {
    if (s.length > 200) {
      return s.substring(0, 199) + "...";
    }
    return s;
  }

  render() {
    // var {comments} = this.state;
    return (
      <div className="forum-post-body">
        <h1 className="view-forum-heading">Form Posts</h1>
        <input
            type="text"
            onChange={this.onSearchHandler}
            placeholder="Enter here to Search"
            className="post-search-bar"
          />
          <FontAwesomeIcon 
          className="search-bar-icon"
          icon = {faSearch}
          />
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

export default Forum;
