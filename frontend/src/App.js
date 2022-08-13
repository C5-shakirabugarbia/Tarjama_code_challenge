import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Home from "./component/home";
import Profile from "./component/profile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/home/:id/:name"} element={<Home />} />
        <Route path={"/profile/:id/:name"} element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
