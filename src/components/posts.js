import React from "react";
import "./posts.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCalendarAlt,
  faUserAlt,
  faEdit,
  faTrashAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert"; // Import

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      comments: [],
      commentUsername: "",
      commentText: "",
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get("http://localhost:3000/community/post/" + id)
      .then((response) => {
        this.setState({
          todos: response.data.results,
          comments: response.data.results.comments,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  commentsBody() {
    const a = this.state.comments;

    return a.map((comment, index) => {
      let commentDate = new Date(Number(comment.date));
      return (
        <div className="commentsDiv">
          <h6>{comment.username}</h6>
          <p id="commentDate">{commentDate.toDateString()}</p>
          <p>{comment.text}</p>
        </div>
      );
    });
  }

  postBody() {
    const {
      postTitle,
      postDescription,
      datePosted,
      postedBy,
      image,
    } = this.state.todos;
    console.log(this.state.todos);
    return (
      <div className="postDiv">
        <div className="postHeader">
          <h2 className="single-post-title">{postTitle}</h2>
          <p>
            <FontAwesomeIcon icon={faCalendarAlt} /> Posted on:{" "}
            {new Date(Number(datePosted)).toDateString()}
          </p>
          <p>
            <FontAwesomeIcon icon={faUserAlt} /> Posted By: {postedBy}
          </p>
        </div>

        <div className="postImageDiv">
          <img src={image} alt={postTitle} />
        </div>
        <div className="postBody">
          <p>{postDescription}</p>
        </div>
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");

    if (this.state.username === "" || this.state.commentText === "") {
      alert("Empty Fields");
      return;
    }

    var data = {
      username: this.state.commentUsername,
      text: this.state.commentText,
      date: Date.now,
      postID: this.state.todos._id,
    };

    console.log(data);
    axios
      .post("http://localhost:3000/community/comment", data)
      .then((res) => {
        if (res.data.status === 1) {
          alert("Comment Posted Successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  upvoteDownvote() {
    return (
      <div className="voteDiv">
        <button
          className="upvoteBtn"
          onClick={() => {
            let data = {
              postID: this.state.todos._id,
            };
            axios
              .put("http://localhost:3000/community/upvote/", data)
              .then((response) => {
                if (response.data.status === 1) {
                  alert("Answer Upvoted Successfully");
                  this.render();
                  console.log(this.state.todos.upvotes);
                } else {
                  alert(response.data);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          <p className="voteCount">{this.state.todos.upvotes}</p>
          <hr />
          <FontAwesomeIcon icon={faThumbsUp} className="f_a_icon" />
          Upvote
        </button>
        <button
          className="downvoteBtn"
          onClick={() => {
            let data = {
              postID: this.state.todos._id,
            };
            axios
              .put("http://localhost:3000/community/downvote/", data)
              .then((response) => {
                if (response.data.status === 1) {
                  alert("Answer Downvoted Successfully");
                } else {
                  alert(response.data);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          <p className="voteCount">{this.state.todos.downvotes}</p>
          <hr />
          <FontAwesomeIcon icon={faThumbsDown} className="f_a_icon" />
          Downvote
        </button>
      </div>
    );
  }

  postComment() {
    return (
      <div className="postComment">
        <h3>Post a Comment</h3>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="username">
            <input
              placeholder="Username"
              type="text"
              name="username"
              onChange={(evt) => {
                console.log(evt.target.value);
                this.setState({ commentUsername: evt.target.value });
              }}
              required
            />
          </div>

          <br />

          <div className="comment">
            <textarea
              placeholder="Comment"
              type="text"
              name="comment"
              onChange={(evt) => {
                console.log(evt.target.value);
                this.setState({ commentText: evt.target.value });
              }}
              required
            />
          </div>

          <div className="submitBtnDiv">
            <button className="submitPost" type="submit">
              <FontAwesomeIcon icon={faCheckCircle} className="f_a_icon" />
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="body">
        {this.postBody()}
        {this.upvoteDownvote()}
        <h3>Comments</h3>
        {this.commentsBody()}
        {this.postComment()}
      </div>
    );
  }
}

export default Posts;
