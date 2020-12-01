import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import fetch from "node-fetch";
import "semantic-ui-css/semantic.min.css";
const Search = (props) => {
  const [dropDownValue, setdropDownValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const stateOptions = [
    { key: "제목", text: "제목", value: "제목" },
    { key: "글", text: "글", value: "글" },
    { key: "작성자", text: "작성자", value: "작성자" },
  ];
  let query = "";
  const handleDropdown = (e) => {
    query = e.target.textContent;
    console.log("handleDropdown", query); //dropDown value 받아옴
  };
  const handleInputValue = (e) => {
    let inputVal = document.querySelector(".search_input").value;
    setInputValue(inputVal);
    setdropDownValue(query);
    console.log(inputVal, query);
  };
  console.log("outSide useEff", dropDownValue, inputValue);
  useEffect(() => {
    let searchQuery = {
      menuQuery: dropDownValue,
      contentQuery: inputValue,
    };
    console.log("searchQuery", searchQuery);
    fetch("http://localhost:3005/notice/search", {
      method: "post",
      body: JSON.stringify(searchQuery),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((val) => props.setObj(val))
      .catch((err) => console.log(err));
  }, [inputValue]);
  const DropdownExampleSearchSelectionTwo = () => (
    <Dropdown
      placeholder="State"
      search
      selection
      options={stateOptions}
      onChange={handleDropdown}
    />
  );

  return (
    <>
      <DropdownExampleSearchSelectionTwo />
      <form>
        <input type="text" className="search_input" />
        <input type="button" value="검 색" onClick={handleInputValue} />
      </form>
    </>
  );
};

export default Search;
