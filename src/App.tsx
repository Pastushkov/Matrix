import { MatrixInput } from "./components/MatrixInput/MatrixInput";
import { MatrixTable } from "./components/MatrixTable/MatrixTable";
import { MatrixProvider } from "./state/MatrixContext";
import "./App.css";
function App() {
  return (
    <MatrixProvider>
      <div className="wrapper">
        <h1>Matrix Generator</h1>
        <MatrixInput />
        <MatrixTable />
      </div>
    </MatrixProvider>
  );
}

export default App;
