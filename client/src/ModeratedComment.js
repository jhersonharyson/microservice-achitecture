import React from "react";

const ModeratedComment = ({ comments }) => {
  const renderComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "rejected") {
      content = "This comment has been Rejected";
    }
    if (comment.status === "pending") {
      content = "This comment is awating moderation";
    }
    console.log(comment.status);

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default ModeratedComment;
