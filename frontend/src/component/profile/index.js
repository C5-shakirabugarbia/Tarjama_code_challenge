import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Row, Col, Container, Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const Profile = () => {
  const userState = useSelector((state) => {
    return {
      isLoggedIn: state.users.isLoggedIn,
    };
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [profileOb, setProfilOb] = useState({});
  const [street, setStreet] = useState("");
  const [city, setcity] = useState("");
  const [username, setusername] = useState("");
  const [website, setwebsite] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const { id, name } = useParams();
  const getUsers = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((result) => {
        setProfilOb(result.data);
        setStreet(result.data.address.street);
        setcity(result.data.address.city);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {userState.isLoggedIn ? (
        <>
          {" "}
          <div className="head">
            <p className="userName">
              Welcome back <span>{name}</span>
            </p>
          </div>
          <Container className="con">
            <Row>
              <Col className="mak">
                <img
                  src="https://i.pinimg.com/236x/77/87/bb/7787bbd042f2d3e9b78e4b9fb3c151cc.jpg"
                  className="Pro"
                />
                <div className="nameE">
                  <h1 className="name">{profileOb.name}</h1>
                  <p className="email">{profileOb.email}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="dis">
                <b>user name :</b>
                <div>{profileOb.username}</div>
              </Col>
            </Row>
            <Row>
              <Col className="dis">
                <b>Address :</b>{" "}
                <div>
                  street-
                  {street} {"  "}
                  city-
                  {city}
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="dis">
                {" "}
                <b>phone :</b>
                <div>{profileOb.phone}</div>
              </Col>
            </Row>
            <Row>
              <Col className="dis">
                {" "}
                <b>website :</b>
                <div>{profileOb.website}</div>
              </Col>
            </Row>
            <Button variant="primary" onClick={handleShow} className="UB">
              Update Your Profile Info
            </Button>
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Profile Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    autoFocus
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setemail(e.target.value);
                      }
                    }}
                  />
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="user name"
                    autoFocus
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setusername(e.target.value);
                      } else {
                        setusername(profileOb.username);
                      }
                    }}
                  />
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="city"
                    autoFocus
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setcity(e.target.value);
                      }
                    }}
                  />
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="street"
                    autoFocus
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setStreet(e.target.value);
                      }
                    }}
                  />
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="website"
                    autoFocus
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setwebsite(e.target.value);
                      } else {
                        setwebsite(profileOb.website);
                      }
                    }}
                  />
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="phone"
                    autoFocus
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        setphone(e.target.value);
                      } else {
                        setphone(profileOb.phone);
                      }
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="closeB"
              >
                Close
              </Button>
              <Button
                className="saveB"
                variant="primary"
                onClick={() => {
                  if (username === "") {
                  } else {
                    profileOb.username = username;
                  }
                  if (website === "") {
                  } else {
                    profileOb.website = website;
                  }
                  if (phone === "") {
                  } else {
                    profileOb.phone = phone;
                  }
                  if (email === "") {
                  } else {
                    profileOb.email = email;
                  }

                  handleClose();
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>LOGIN</>
      )}
    </>
  );
};
export default Profile;
