import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
const Search = (setObj) => {
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
    console.log(
      `inputValue : ${inputValue} , dropDownValue : ${dropDownValue}`
    );
  };

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
