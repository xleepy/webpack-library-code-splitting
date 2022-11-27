import { h, render } from "preact";
import { Bee } from "@test/shared-code-exmpl/dist/bee";
import { Bass } from "@test/shared-code-exmpl/dist/bass";

function App() {
  return (
    <div>
      <Bee />
      <Bass />
    </div>
  );
}

render(<App />, document.getElementById("app"));
