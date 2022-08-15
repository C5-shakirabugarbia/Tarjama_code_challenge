import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../redux/reducers/users";
import "./style.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const userState = useSelector((state) => {
    return {
      isLoggedIn: state.users.isLoggedIn,
    };
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name } = useParams();

  return (
    <>
      {" "}
      {userState.isLoggedIn ? (
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
              <li
                onClick={() => {
                  dispatch(setLogOut());
                  navigate("/");
                }}
              >
                logout
              </li>
            </ul>
            <div className="homecontent"> </div>
          </div>
        </div>
      ) : (
        <>LOGIN first</>
      )}
    </>
  );
};
export default Home;
