import React, { useEffect } from "react";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

const Columns = (props) => {
  console.log("Columns_props: ", props);
  // Search(setObj); search 에서 click이 일어나면 fetch로 데이터를 요청 후 setObj  columns 데이터가 바뀌면 데이터 뿌려지게끔.

  let data;

  if (props.obj.length !== 0 && Array.isArray(props.obj)) {
    data = props.obj.map((val) => {
      //idx는 유저의 id로 하자. notice 배열객체에 들어가있음.  외래키로.
      return (
        <>
          <Link to={`/notice/${val.notice_id}`} key={v4()}>
            <div className="columns">
              -<div className="column_title">{val.title}</div>
              <div className="column_content">
                <span className="text">{val.content}</span>
                <br />

                <br />
                <span className="user">{val.name}</span>
                <br />
                <span className="user">{val.update_date}</span>
              </div>
            </div>
          </Link>
          <Link to={`/modify/${val.notice_id}`}>
            <button>수정하기</button>
          </Link>
        </>
      );
    });
    return data;
  } else {
    return <h2>Loading...</h2>;
  }
};

export default Columns;
