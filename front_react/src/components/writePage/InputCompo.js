import React, { useState } from "react";
import fetch from "node-fetch";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
const InputCompo = ({ obj, params }) => {
  console.log("InputCompo", obj, params);
  const [title, setTitle] = useState(obj.length === 0 ? "" : obj[0].title);
  const [content, setContent] = useState(
    obj.length === 0 ? "" : obj[0].content
  );
  console.log(`title :${title} , content : ${content}`);
  //db로 보내야할 값들 notice_id =uuid , title , content , username 은 login구현하여 로컬스토리지에 저장되어있는
  const titleOnChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const contentOnChange = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const saveData = () => {
    let saveBody = {
      noticeId: v4(),
      title,
      content,
      userId: 51,
    };

    fetch("http://localhost:3005/notice/writePage", {
      method: "post",
      body: JSON.stringify(saveBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((val) => console.log(val))
      .catch((err) => console.log(err));
  };

  const modifyPageSave = () => {
    console.log("match params from modifyPage");
    let modifyBody = {
      noticeId: params,
      title,
      content,
    };
    fetch("http://localhost:3005/notice/modifyPage", {
      method: "post",
      body: JSON.stringify(modifyBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((val) => console.log(val))
      .catch((err) => console.log(err));
  };

  return obj.length === 0 ? (
    <div className="writePage">
      <label>
        제목
        <input type="text" className="title_input" onChange={titleOnChange} />
      </label>
      <label>
        내용
        <textarea className="content_input" onChange={contentOnChange} />
      </label>
      <Link to="/">
        <button className="writeSubmit_btn" onClick={saveData}>
          저장 하기
        </button>
      </Link>
    </div>
  ) : (
    <div className="writePage">
      <label>
        제목
        <input
          type="text"
          className="title_input"
          onChange={titleOnChange}
          defaultValue={title}
        />
      </label>
      <label>
        내용
        <textarea
          className="content_input"
          defaultValue={content}
          onChange={contentOnChange}
        />
      </label>
      <Link to="/">
        <button className="writeSubmit_btn" onClick={modifyPageSave}>
          저장 하기
        </button>
      </Link>
    </div>
  );
};

export default InputCompo;
