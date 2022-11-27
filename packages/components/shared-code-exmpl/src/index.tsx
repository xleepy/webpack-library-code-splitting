import { h, render } from "preact";
import { Bass } from "./bass";
import { Bee } from "./bee";

function App() {
  return (
    <div>
      <Bee />
      <Bass />
    </div>
  );
}

render(<App />, document.getElementById("app"));
