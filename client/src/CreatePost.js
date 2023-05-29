import React, { useState } from "react";
import axios from "axios";

const CreatePost = ({ setUpdate }) => {
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
      </form>
    </div>
  );
};


export default CreatePost