import {
  Row,
  Col,
  Container,
  Modal,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setComments,
  setPosts,
  setUsers,
  deletepost,
  addPost,
  updatePost,
} from "../../redux/reducers/users";
import { IoIosContact } from "react-icons/io";
import { useParams } from "react-router-dom";
const Posts = () => {
  const [theId, setTheId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const userState = useSelector((state) => {
    return {
      users: state.users.users,
      posts: state.users.posts,
      albums: state.users.albums,
      comments: state.users.comments,
      isLoggedIn: state.users.isLoggedIn,
    };
  });
  const posts = () => {
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
  const comments = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .then((result) => {
        console.log(result.data.length);
        dispatch(setComments(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
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
    comments();
    posts();
  }, []);
  return (
    <>
      {useState.isLoggedIn ? (
        <>
          {" "}
          <div className="head">
            <p className="userName">
              Welcome back <span>{name}</span>
            </p>
          </div>
          <Container className="mind">
            {" "}
            <Card>
              <Card.Header>Make a Post</Card.Header>
              <Card.Body>
                <Card.Title>{name} What's on your mind ?</Card.Title>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="post title"
                    autoFocus
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="write your thoughts here"
                    onChange={(e) => {
                      setbody(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (body !== "" && title !== "") {
                      dispatch(
                        addPost({
                          userId: id,
                          title: title,
                          body: body,
                        })
                      );
                    }
                  }}
                >
                  Post
                </Button>
              </Card.Body>
            </Card>
          </Container>
          <Container>
            <Row>
              {userState.posts.map((post, index) => {
                return (
                  <Col lg={12} className="comm" key={index}>
                    <Card>
                      <Card.Header>{post.id}</Card.Header>
                      <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.body}</Card.Text>
                        {post.userId == id ? (
                          <>
                            {" "}
                            <Button
                              variant="primary"
                              onClick={() => {
                                dispatch(deletepost(post.id));
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="primary"
                              className="Ub"
                              onClick={() => {
                                setTheId(post.id);
                                handleShow();
                              }}
                            >
                              Update post
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="post Title"
                                      autoFocus
                                      onChange={(e) => {
                                        setTitle(e.target.value);
                                      }}
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                  >
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      placeholder="write your thoughts here"
                                      onChange={(e) => {
                                        setbody(e.target.value);
                                      }}
                                    />
                                  </Form.Group>
                                </Form>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    console.log(
                                      "title",
                                      title,
                                      "id",
                                      theId,
                                      "body",
                                      body
                                    );
                                    dispatch(
                                      updatePost({
                                        id: theId,
                                        title: title,
                                        body: body,
                                      })
                                    );
                                    handleClose();
                                  }}
                                >
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        ) : (
                          <></>
                        )}
                      </Card.Body>
                    </Card>
                    <h2 className="unL">comments</h2>
                    {userState.comments.map((comments, i) => {
                      if (comments.postId === post.id) {
                        return (
                          <div className="com">
                            <div className="insid">
                              <IoIosContact className="pc" />{" "}
                              <p>{comments.name}</p>
                            </div>
                            <div>
                              {" "}
                              <p className="conam">{comments.body}</p>
                            </div>
                          </div>
                        );
                      }
                    })}{" "}
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      ) : (
        <>logIN first</>
      )}
    </>
  );
};
export default Posts;
