import React, { useEffect, useState } from "react";
// import ClickNotice from "../clickNotice/ClickNotice";
import { Link } from "react-router-dom";
import Dum from "./Dum";

const Columns = () => {
  // const [obj,setObj]=useState([])
  let data = Dum.map((val, idx) => {
    return (
      <Link to={`/notice/${idx}`}>
        <div className="columns">
          -<div className="column_title">{val.title}</div>
          <div className="column_content">
            <span className="text">{val.content}</span>
            <span className="user"></span>
          </div>
        </div>
      </Link>
    );
  });
  return data;
};

export default Columns;
