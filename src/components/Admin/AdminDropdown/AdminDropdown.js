import { Button, Form, Input, Menu, message, Modal, Upload } from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";
import React, { useEffect, useRef, useState } from "react";
import {
  AiFillProfile,
  AiOutlineCloudUpload,
  AiOutlineInbox,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { User } from "../../../utils/apiLists";
let authToken = localStorage.getItem("jwt");
authToken = JSON.parse(authToken);

const tagsData = [
  "Preschool",
  "Elementary",
  "High school",
  "weac",
  "jamb",
  "Tertiary",
  "Mathematics",
  "English",
  "Junior_science",
  "Senior_science",
  "Chemistry",
  "Biology",
  "Further_Maths",
  "Government",
  "Accounting",
  "Commerce",
];

const AdminDropdown = ({ user }) => {
  const [userMain, setUserMain] = useState(user);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const descriptionRef = useRef(null);
  const uploadRef = useRef(null);

  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [componentSize, setComponentSize] = useState("default");
  const [selectedTags, setSelectedTags] = useState([]);
  const [screen, setScreen] = useState(window.screen.width);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState([]);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  useEffect(() => {
    const checkResize = (e) => {
      setScreen(window.screen.width);
    };

    window.addEventListener("resize", checkResize);

    return () => window.removeEventListener("resize", checkResize);
  }, []);

  const toggleFile = () => {
    uploadRef.current.click();
  };

  const handleUploadChange = () => {
    setUserMain((prev) => {
      return {
        ...prev,
        name: nameRef.current.input.value,
        password: passwordRef.current.input.value,
        email: emailRef.current.input.value,
        description: descriptionRef.current.resizableTextArea.props.value,
      };
    });
    setImg([uploadRef.current.files[0]]);
    console.log(uploadRef.current.files[0]);
    message.success(`file uploaded successfully`);
  };

  const clearFile = () => {
    setImg([]);
    message.success(`file removed successfully`);
  };

  const handleChange = (tag, checked) => {
    setUserMain((prev) => {
      return {
        ...prev,
        name: nameRef.current.input.value,
        password: passwordRef.current.input.value,
        email: emailRef.current.input.value,
        description: descriptionRef.current.resizableTextArea.props.value,
      };
    });
    let nextSelectedTags;
    if (selectedTags.length > 3) {
      nextSelectedTags = checked
        ? [...selectedTags]
        : selectedTags.filter((t) => t !== tag);
    } else {
      nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
    }

    setSelectedTags([...nextSelectedTags]);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const name = nameRef.current.input.value;
    const password = passwordRef.current.input.value;
    const description = descriptionRef.current.resizableTextArea.props.value;

    let formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    password !== "" && formData.append("password", password);
    console.log(selectedTags);
    selectedTags.length > 0 && formData.append("tags", selectedTags);

    img.length > 0 && formData.append("images", img[0]);

    const url = `${process.env.REACT_APP_API_BASE_URI}${User.update}`;

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData, // body data type must match "Content-Type" header
    });

    const result = await response.json();

    console.log(result);
    setTimeout(() => {
      location.reload();
    }, 2000);

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleLogout = async () => {
    const url = `https://tec-server-api.herokuapp.com/api/v1/${User.logout}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({}),
    });

    const result = await res.json();
    localStorage.removeItem("jwt");

    if (result) {
      history.push("/tec-client/login");
    }
  };
  return (
    <Menu>
      <Menu.Item key={"1"}>
        <div
          style={{
            display: "flex",
            WebkitAlignItems: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={showModal}
        >
          <AiFillProfile style={{ marginRight: 5 }} />
          Profile
        </div>
      </Menu.Item>
      <Menu.Item key={"2"}>
        <div
          style={{
            display: "flex",
            WebkitAlignItems: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleLogout}
        >
          <AiOutlineLogout style={{ marginRight: 5 }} />
          <span>Logout</span>
        </div>
      </Menu.Item>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          validateMessages={validateMessages}
          fields={[
            {
              value: userMain.description,
              name: ["description"],
            },

            {
              value: userMain.email,
              name: ["email"],
            },
            {
              value: userMain.name,
              name: ["name"],
            },
          ]}
        >
          <Form.Item
            hasFeedback
            label="Name"
            name={"name"}
            rules={[{ required: true }]}
          >
            <Input ref={nameRef} />
          </Form.Item>

          <Form.Item label="Email" name={"email"}>
            <Input disabled ref={emailRef} />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Password"
            name={"password"}
            rules={[{ min: 8 }]}
            help="Should be minimum of 8 characters"
          >
            <Input.Password ref={passwordRef} />
          </Form.Item>

          <Form.Item label="Tags">
            {tagsData.map((tag) => (
              <CheckableTag
                style={{
                  marginBottom: 5,
                }}
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </Form.Item>

          <Form.Item label="Description" name={"description"}>
            <Input.TextArea
              ref={descriptionRef}
              allowClear
              rows={6}
              placeholder="maxLength is 200"
              showCount
              maxLength={200}
            />
          </Form.Item>

          <div
            style={{
              width: screen < 500 ? "99%" : "66%",
              margin: "auto",
            }}
          >
            <Button
              onClick={toggleFile}
              icon={
                <AiOutlineCloudUpload
                  style={{
                    marginRight: 5,
                    paddingTop: 3,
                  }}
                />
              }
            >
              {" "}
              Click to Upload
            </Button>

            <input
              type="file"
              className="file__hidden"
              ref={uploadRef}
              onChange={handleUploadChange}
            />
          </div>
          {img.length > 0 ? (
            <div
              className="upload__tray"
              style={{
                width: screen < 500 ? "99%" : "66%",
                margin: "auto",
              }}
            >
              <div className="upload__name">
                {img.map((e) => {
                  return <span key={e.name}>{e.name}</span>;
                })}
              </div>
              <div>
                <FiTrash onClick={clearFile} />
              </div>
            </div>
          ) : null}
        </Form>
      </Modal>
    </Menu>
  );
};

export default AdminDropdown;
