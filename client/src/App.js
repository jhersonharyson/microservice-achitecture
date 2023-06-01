import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from "react";
import CreatePost from "./CreatePost";
import GetPost from "./GetPosts";

const App = () => {
  return ( <div className="container w-75 mt-5">
      <h2> Create New Post </h2>
      <CreatePost/>
      <h3 className="ml-0 my-3">Posts</h3>
      <GetPost/>
    </div>)
    
};

export default App;