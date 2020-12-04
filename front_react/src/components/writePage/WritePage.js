import InputCompo from "./InputCompo";

const WritePage = () => {
  let obj = [{}]; //inputComponent에서 조건부 랜더링과 조건부 state값을 위해 만든 배열
  return <InputCompo obj={obj} />;
};

export default WritePage;
