import { useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./style.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  return (
    <div className="homeCon">
      <div className="head">
        <p
          className="userName"
          onClick={() => {
            navigate(`/profile/${id}/${name}`);
          }}
        >
          Welcome back <span>{name}</span>
        </p>
      </div>
      <div className="sideBar">
        <ul className="sideBarlist">
          <li className="firstList">Tools</li>
          <li
            onClick={() => {
              navigate(`/users/${id}/${name}`);
            }}
          >
            users
          </li>
          <li
            onClick={() => {
              navigate(`/posts/${id}/${name}`);
            }}
          >
            posts
          </li>
          <li>logout</li>
        </ul>
        <div className="homecontent"> </div>
      </div>
    </div>
  );
};
export default Home;
