import React, { useState, useEffect } from "react";

const ClickNotice = ({ match }) => {
  const [title, setTitle] = useState("hello");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  console.log(match);
  return <span>{title}</span>;
};

export default ClickNotice;
