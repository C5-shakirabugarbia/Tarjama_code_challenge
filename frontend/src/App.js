import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Home from "./component/home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/home/:id/:name"} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
