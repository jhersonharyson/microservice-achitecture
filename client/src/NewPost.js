import React, { useState } from "react";
import axios from "axios";

const NewPost = ({ setUpdate }) => {
  const [title, setTitle] = useState("");

  const submitPost = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/posts", { title })
      .catch((err) => {
        console.log(err);
      });

    setTitle("");
    document.location.reload()
  };
  const refresh = (e) => {
    e.preventDefault();
    document.location.reload()
  }
  return (
    <div>
      <form onSubmit={submitPost}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Post title"
          />
        </div>
        <button className="btn btn-primary">Post</button>
        <button className="btn btn-success ml-2" onClick={refresh}>Refresh</button>
      </form>
    </div>
  );
};


export default NewPost