import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import InputCompo from "../writePage/InputCompo";
const ModifyPage = ({ match }) => {
  const [obj, setObj] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/notice/clickPage/${match.params.id}`)
      .then((res) => res.json())
      .then((val) => setObj(val));
  }, []);

  return obj.length !== 0 ? (
    <InputCompo obj={obj} params={match.params.id} />
  ) : (
    <h2>Loading...</h2>
  );
};

export default ModifyPage;
