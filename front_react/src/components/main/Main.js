import React, { useState, useEffect } from "react";
import Search from "./Search";
import Columns from "./Columns";

const Main = () => {
  const [obj, setObj] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/notice/mainPage")
      .then((res) => res.json())
      .then((val) => setObj(val))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {console.log("Main Obj", obj)}
      <Columns setObj={setObj} obj={obj} />
      <Search setObj={setObj} />
    </div>
  );
};
export default Main;
