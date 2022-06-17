import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Avatar, message } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { User } from "../../../utils/apiLists";
let authToken = localStorage.getItem("jwt");
authToken = JSON.parse(authToken);
// const active = false

// const data = [
//     {
//       key: '1',
//       name: 'John Brown',
//       email: 'abc@gmail.com',
//       image: 'http://res.cloudinary.com/dpi44zxlw/image/upload/v1648852656/tec-client/62477ead3abba242aeee0e4f.png',
//       active: false,
//       tags: ['nice', 'developer'],
//     },
//   ];

const ViewTutor = () => {
  const [data, setData] = useState([]);
  const handleActivateOnClick = async (id) => {
    const url = `https://tec-server-api.herokuapp.com/api/v1/${User.activate}`;
    const response = await fetch(url, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        activate: true,
        id,
      }), // body data type must match "Content-Type" header
    });

    const result = await response.json();

    if (!result.e) {
      message.success("User Activated Succesfully");
      const { user } = result;
      setData([
        { ...user, key: user._id, status: user.active ? "Active" : "Inactive" },
      ]);
    } else {
      message.error("Something went wrong");
    }
  };

  const handleInactivateOnClick = async (id) => {
    const url = `https://tec-server-api.herokuapp.com/api/v1/${User.activate}`;
    const response = await fetch(url, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        activate: false,
        id,
      }), // body data type must match "Content-Type" header
    });

    const result = await response.json();

    if (!result.e) {
      message.success("User Inactivated Succesfully");
      const { user } = result;
      setData([
        { ...user, key: user._id, status: user.active ? "Active" : "Inactive" },
      ]);
    } else {
      message.error("Something went wrong");
    }
  };

  const handleDeleteClick = async (id) => {
    const newId = User.delete(id);
    const url = `https://tec-server-api.herokuapp.com/api/v1/${newId}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const result = await res.json();

    if (!result) {
      return message.error("An error occured while deleting User");
    }

    message.success("User deleted succesfully");

    getTutors().then((res) => {
      const newArr = res.map((e) => {
        return { ...e, key: e._id, status: e.active ? "Active" : "Inactive" };
      });
      // console.log(newArr);
      setData([...newArr]);
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text, record) => <Avatar src={record.img} />,
    },
    {
      title: "Activate",
      dataIndex: "activate",
      render: (text, record) => (
        <Space
          size="middle"
          onClick={() => handleActivateOnClick(record.key)}
          style={{
            cursor: "pointer",
          }}
        >
          <a>Activate</a>
        </Space>
      ),
    },
    {
      title: "Inactivate",
      dataIndex: "inactivate",
      render: (text, record) => (
        <Space
          size="middle"
          onClick={() => handleInactivateOnClick(record.key)}
          style={{
            cursor: "pointer",
          }}
        >
          <a>Inactivate</a>
        </Space>
      ),
    },
    {
      title: "Delete",
      key: "action",
      render: (text, record) => (
        <Space
          size="middle"
          onClick={() => handleDeleteClick(record.key)}
          style={{
            cursor: "pointer",
            color: "red",
          }}
        >
          <AiOutlineDelete />
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const getTutors = async () => {
    const url = `https://tec-server-api.herokuapp.com/api/v1/${User.tutors}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const result = await res.json();
    console.log(result);

    return result;
  };

  useEffect(() => {
    getTutors().then((res) => {
      console.log(res);
      const newArr = res.user.map((e) => {
        return { ...e, key: e._id, status: e.active ? "Active" : "Inactive" };
      });
      // console.log(newArr);
      setData([...newArr]);
    });
  }, []);
  const history = useHistory();
  return <Table columns={columns} dataSource={data} />;
};

export default ViewTutor;
