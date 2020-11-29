import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
export default function Search(props) {
  const options = ["제목", "글", "작성자"];
  return (
    <>
      <Dropdown options={options} />

      <input type="text" className="search_input" />
      <a href="/writePage">
        <button className="sendQuerey">확인</button>
      </a>
    </>
  );
}
