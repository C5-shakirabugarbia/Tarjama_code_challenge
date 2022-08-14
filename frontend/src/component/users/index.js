import { Row, Col } from "react-bootstrap";
import "./style.css";
import axios from "axios";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUsers, setAlbums } from "../../redux/reducers/users";

import { useParams } from "react-router-dom";
const Users = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const userState = useSelector((state) => {
    return {
      users: state.users.users,
      posts: state.users.posts,
      albums: state.users.albums,
    };
  });
  const getUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((result) => {
        dispatch(setUsers(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postsnum = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((result) => {
        console.log(result.data.length);
        dispatch(setPosts(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const albumsnum = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums`)
      .then((result) => {
        console.log(result.data.length);
        dispatch(setAlbums(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
    albumsnum();
    postsnum();
  }, []);
  return (
    <>
      <div className="head">
        <p className="userName">
          Welcome back <span>{name}</span>
        </p>
      </div>
      <div className="backg">
        {" "}
        <h1>User Info</h1>
        <Row className="rowd">
          {userState.users.map((element, index) => {
            let y = 0;
            let x = 0;
            userState.posts.map((post, i) => {
              if (post.userId === index + 1) {
                x++;
              }
              return x;
            });
            userState.albums.map((album, i) => {
              if (album.userId === index + 1) {
                y++;
              }
              return y;
            });

            return (
              <Col lg={4} md={6} sm={8} className="cold">
                <div>User Name : {element.name}</div>
                <div>number of posts: {x}</div>
                <div> number of albums: {y}</div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};
export default Users;
