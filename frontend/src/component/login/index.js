import { Row, Col, Container } from "react-bootstrap";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/reducers/users";

const Login = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  const [email, setemail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userState = useSelector((state) => {
    return {
      users: state.users.users,
    };
  });
  const check = () => {
    console.log("testing", userState.users);
    let test = 0;
    let usertest = 0;
    let emailtest = 0;
    let id;
    let name;
    userState.users.forEach((element) => {
      if (element.email === email && element.username === user) {
        test++;
        id = element.id;
        name = element.name;
      }
      if (element.email === email) {
        emailtest++;
      }
      if (element.username === user) {
        usertest++;
      }
    });
    if (test === 1) {
      console.log(true);
      navigate(`/home/${id}/${name}`);
    }
    if (usertest === 1 && emailtest === 0) {
      setMessage("wrong password try agian");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
    if (usertest === 0 && emailtest === 1) {
      setMessage("user dose not exist");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
    if (usertest === 0 && emailtest === 0) {
      setMessage("user dose not exist");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };
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
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="bg">
      {" "}
      <Container className="logPage">
        <Row>
          <Col className="logoImg" lg={6} md={6} sm={12}>
            <div className="welcome">
              <h1>AG Blog</h1>
              <p>
                Share your thoughts with friends and the world around you on AG
                Blog .
              </p>
            </div>

            {/* <img src={img} alt="big logo" className="imm" /> */}
          </Col>
          <Col className="logForm" lg={6} md={6} sm={12}>
            <div className="Up">
              <p>Login to share your thoughts</p>{" "}
            </div>
            <div className="form">
              <input
                type={"text"}
                placeholder={"User Name"}
                className="inputs"
                onChange={(e) => {
                  setuser(e.target.value);
                }}
              />

              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type={"password"}
                placeholder={"Password"}
                className="inputs"
              />

              <button
                className="sub"
                onClick={() => {
                  console.log(user);
                  console.log(email);
                  check();
                }}
              >
                Login
              </button>
              <p>{message}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
