import logo from "./logo.svg";
import "./App.css";
import "react-router-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./screens/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
