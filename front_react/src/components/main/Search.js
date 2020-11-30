import React from "react";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
const Search = (setObj) => {
  const stateOptions = [
    { key: "제목", text: "제목", value: "제목" },
    { key: "글", text: "글", value: "글" },
    { key: "작성자", text: "작성자", value: "작성자" },
  ];
  const handleDropdown = (data) => {
    console.log(data.target.textContent); //dropDown value 받아옴
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

      <input type="text" className="search_input" />

      <button className="sendQuerey">확인</button>
    </>
  );
};

export default Search;
