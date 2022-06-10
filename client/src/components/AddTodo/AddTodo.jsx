import React, { useState } from "react";
import axios from "axios";
import "./AddTodo.css";
import {  useNavigate } from "react-router-dom";

const Navbar = () => {
  const [titleVal, setTitleVal] = useState("");
  const [descVal, setDescVal] = useState("");

  const navigate = useNavigate();
  const titleValue = (e) => {
    setTitleVal(e.target.value);
  };

  const DescValue = (e) => {
    setDescVal(e.target.value);
  };

 

  // const API_URL = "http://192.168.100.23:3000/posts/";
  const API_URL = "https://todoapp0123.herokuapp.com/posts/";
  // const API_URL = "http://localhost:3000/posts/";

  const submitForm = async (e) => {
    e.preventDefault();

    if (titleVal.length >= 5 && descVal.length >= 5 ) {
      const post = await axios
        .post(API_URL, { title: titleVal, description: descVal })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      setTitleVal("");
      setDescVal("");
      navigate("/todos");
    } else {
      console.log("empty");
    }
  };

  return (
    <div className="container">
      <div className="todo-card">
        <form onSubmit={(e) => submitForm(e)}>
          <input type="text" maxlength="6" onChange={titleValue} placeholder="Add Title" min-length="5" />
          <input
            type="text"
            onChange={DescValue}
            placeholder="Add Description"
            maxlength="200"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
