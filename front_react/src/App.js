import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main/Main";
import WritePage from "./components/writePage/WritePage";
import ClickNotice from "./components/clickNotice/ClickNotice";
import ModifyPage from "./components/modifyPage/ModifyPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/modify/:id" component={ModifyPage} />
        <Route path="/notice/:id" component={ClickNotice} />
        <Route path="/writePage" component={WritePage} />

        {/* <Route path="/login" component={Login} /> */}
      </Switch>
    </div>
  );
}

export default App;
