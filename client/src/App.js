import logo from "./logo.svg";
import "./App.css";
import "react-router-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SignUp from "./screens/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
