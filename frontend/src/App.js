import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Home from "./component/home";
import Profile from "./component/profile";
import Users from "./component/users";
import Posts from "./component/posts";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/home/:id/:name"} element={<Home />} />
        <Route path={"/profile/:id/:name"} element={<Profile />} />
        <Route path={"/users/:id/:name"} element={<Users />} />
        <Route path={"/posts/:id/:name"} element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
