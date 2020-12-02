import React, { useState } from "react";
import Search from "./Search";
import Columns from "./Columns";

const Main = () => {
  const [obj, setObj] = useState([]);
  return (
    <div>
      {console.log("Main Obj", obj)}
      <Columns setObj={setObj} obj={obj} />
      <Search setObj={setObj} />
    </div>
  );
};
export default Main;
