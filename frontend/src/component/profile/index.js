import "./style.css";
import axios from "axios";

import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const Profile = () => {
  const [profileOb, setProfilOb] = useState({});
  const [street, setStreet] = useState("");
  const [city, setcity] = useState("");
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
    <div className="homeCon">
      <div className="head">
        <p className="userName">
          Welcome back <span>{name}</span>
        </p>
      </div>
    </div>
  );
};
export default Profile;
