import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
const ClickNotice = ({ match }) => {
  const [obj, setObj] = useState([]);
  console.log("match", match);
  useEffect(() => {
    fetch(`http://localhost:3005/notice/clickPage/${match.params.id}`)
      .then((res) => res.json())
      .then((value) => setObj(value))
      .catch((err) => console.log("clickedPage", err));
  }, []);

  if (obj.length !== 0) {
    return (
      <>
        <div>{obj[0].title}</div>
        <br />
        <div>{obj[0].content}</div>
        <br />
        <div>{obj[0].update_date}</div>
      </>
    );
  } else {
    return <h2>Loading...</h2>;
  }
};

export default ClickNotice;
