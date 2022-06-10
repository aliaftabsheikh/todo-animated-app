import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import axios from "axios";
import "./Todos.css"

const Todos = () => {
  const [ApiData, setApiData] = useState([]);
  const [updatetitleVal, setUpdateTitleVal] = useState("");
  const [updatedescVal, setUpdateDescVal] = useState("");
  const [editId, setEditId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [readMore, setReadMore] = useState(true)



  const showModal = () => {
    setIsModalVisible(true);
  };

 

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const updateTitleValue = (e) => {
    setUpdateTitleVal(e.target.value);
  };

  const updateDescValue = (e) => {
    setUpdateDescVal(e.target.value);
  };

    const API_URL = "http://localhost:3000/posts/";
//   const API_URL = "http://192.168.100.23:3000/posts/";

  const getData = async () => {
    try {
      // eslint-disable-next-line
      const response = await axios.get(API_URL);
      const data = await response.data;
      setApiData(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id) => {
    // eslint-disable-next-line
    const deleteItem = await axios.delete(`${API_URL}/${id}`);
    getData();
  };

  const updateData = async (id) => {
    // eslint-disable-next-line
    const updateItem = await axios.patch(`${API_URL}/${editId}`, {
      title: updatetitleVal,
      description: updatedescVal,
    });
    setIsModalVisible(false);
    setEditId("");
    getData();
  };

  return (
    <div className="app__todo-container">
      {ApiData.map((item, index) => {
        let date = new Date(item.createdAt);
        return (
          <div className={`app__todo-sub-container ${!readMore ? "check1" : ''}`} key={index}>

            <div className="app__char-box">
            <p className="app__title-char">{(item.title.slice(0,1).toUpperCase())}</p>
            </div>
            <div className="app__items">
            <h1 className="app__title">{item.title}</h1>
            <h6 className="app__desc">{readMore ? item.description.slice(0, 29) : item.description}{item.description.length > 29 && readMore ? <a href="#" onClick={() => setReadMore(!readMore)}>Read More</a> : item.description.length > 30 ? <a href="#" onClick={() => setReadMore(!readMore)} >Show Less</a> : ''}</h6>
            <p className="app__date">{date.toDateString()}</p>

            <div className="app__button">
            <button className="btn-delete" onClick={() => deleteData(item?._id)}>Delete</button>
            <button
            className="btn-edit"
              onClick={() => {
                showModal();
                setEditId(item?._id);
              }}
            >
              Edit
            </button>
            </div>
          </div>
          </div>

        );
      })}
      <Modal
        title="EDIT TODO"
        visible={isModalVisible}
        onOk={() => updateData()}
        onCancel={handleCancel}
      >
        <Input
          type="text"
          onChange={updateTitleValue}
          placeholder="Add Title"
          style={{marginBottom: "10px"}}
        />
        <Input
          type="text"
          onChange={updateDescValue}
          placeholder="Add Description"
        />
      </Modal>
    </div>
  );
};

export default Todos;
