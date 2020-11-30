import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import Dum from "./Dum";

const Columns = () => {
  // const [obj,setObj]=useState([])
  let data = Dum.map((val, idx) => {
    return (
      <Link to={`/notice/${idx}`} key={v4()}>
        <div className="columns">
          -<div className="column_title">{val.title}</div>
          <div className="column_content">
            <span className="text">{val.content}</span>
            <br />
            <span className="user">{val.user}</span>
            <br />
            <span className="user">{val.date}</span>
          </div>
        </div>
      </Link>
    );
  });
  return data;
};

export default Columns;
