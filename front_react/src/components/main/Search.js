import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import fetch from "node-fetch";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
const Search = (props) => {
  console.log("Search_props: ", props);
  const [dropDownValue, setdropDownValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const stateOptions = [
    { key: "제목", text: "제목", value: "제목" },
    { key: "글", text: "글", value: "글" },
    { key: "작성자", text: "작성자", value: "작성자" },
  ];

  const handleDropdown = (e) => {
    setdropDownValue(e.target.textContent);
  };

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputValue = (e) => {
    e.preventDefault();
    let searchBody = {
      menuQuery: dropDownValue,
      contentQuery: inputValue,
    };

    if (dropDownValue !== "" && inputValue !== "") {
      fetch("http://localhost:3005/notice/search", {
        method: "post",
        body: JSON.stringify(searchBody),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((val) => props.setObj(val))
        .catch((err) => console.log(err));
    }
  };

  const DropdownExampleSearchSelectionTwo = () => (
    <Dropdown
      placeholder="State"
      search
      selection
      value={dropDownValue}
      options={stateOptions}
      onChange={handleDropdown}
    />
  );

  return (
    <>
      {console.log("Search_render")}
      <DropdownExampleSearchSelectionTwo />

      <input type="text" className="search_input" onChange={onChangeInput} />
      <input
        type="button"
        className="search_btn"
        value="검 색"
        onClick={handleInputValue}
      />

      <Link to="/writePage">
        <button className="modifyBtn">글 추가</button>
      </Link>
    </>
  );
};

export default Search;
