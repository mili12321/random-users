import { List } from "../../cmps/List/List";
import { Main } from "../../cmps/Main/Main";
import "../../../src/assets/styles/reset.scss";
import "../../../src/assets/styles/common.scss";
import "./App.scss";

export function App() {
  return (
    <div className="App">
      <List />
      <Main />
    </div>
  );
}
