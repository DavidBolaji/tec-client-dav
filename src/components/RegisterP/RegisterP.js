import React, { useState, useRef } from "react";
import { Form, Input, Button, Checkbox, Divider, Upload, message } from "antd";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import EduLogo from "../../assets/img/code.svg";
import {
  AiOutlineMail,
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import "./RegisterP.css";
import { Link, useHistory } from "react-router-dom";

import { FiTrash, FiUser } from "react-icons/fi";

import { User } from "../../utils/apiLists";

const RegisterP = () => {
  const uploadRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [img, setImg] = useState([]);
  const [check, setcheck] = useState(false);
  // const [validated, setValidate] = useState(false);
  const url = `${process.env.REACT_APP_API_BASE_URI}${User.register}`;
  const history = useHistory();

  const onChange = (e) => {
    setcheck((prev) => !prev);
  };

  const toggleFile = () => {
    uploadRef.current.click();
  };

  const handleUploadChange = () => {
    setImg([uploadRef.current.files[0]]);
    console.log(uploadRef.current.files[0]);
    message.success(`file uploaded successfully`);
  };

  const clearFile = () => {
    setImg([]);
    message.success(`file removed successfully`);
  };

  const checkValidateName = () => {
    console.log(nameRef.current.input.value);
  };

  const checkValidateEmail = () => {};

  const checkValidatePass = () => {};

  const handleSubmit = async () => {
    const name = nameRef.current.input.value;
    const email = emailRef.current.input.value;
    const password = passwordRef.current.input.value;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    formData.append("images", img[0]);

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {},
      body: formData, // body data type must match "Content-Type" header
    });

    const result = await response.json();

    console.log(result);

    if (!result.code) {
      message.success(`User Registered successfully`);

      setTimeout(() => {
        history.push("/tec-client/login");
      }, 3000);
    } else {
      message.error(`Something went wrong please try a different email`);
    }

  };

  return (
    <div
      className="register__page"
      data-aos="flip-left"
      data-aos-duration="1500"
    >
      <div className="register__page__form">
        <div className="register__page__left">
          <h2>Register</h2>
          <p>Earn money being a tutor</p>
          {/* <Button 
                 style={{
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    borderRadius: 20,
                 }}
                > <FcGoogle /><span className='google' > Register with Google</span></Button> */}
          {/* <Divider plain>or Register with Email</Divider> */}
          <form className="register__page__form__group">
            <div className="register__page__name">
              <label className="label">Name*</label>
              <Input
                placeholder="Enter Name"
                ref={nameRef}
                name="name"
                prefix={<FiUser />}
                onBlur={checkValidateName}
                autoComplete="false"
              />
            </div>
            <div className="register__page__email">
              <label className="label">Email*</label>
              <Input
                placeholder="Enter Email"
                ref={emailRef}
                name="email"
                prefix={<AiOutlineMail />}
                // onBlur={checkValidateEmail}
                autoComplete="false"
              />
            </div>
            <div className="register__page__password">
              <label className="label">Password*</label>

              <Input.Password
                placeholder="Enter password"
                name="password"
                ref={passwordRef}
                prefix={<RiLockPasswordLine />}
                iconRender={(visible) =>
                  visible ? <AiFillEye /> : <AiFillEyeInvisible />
                }
                // onBlur={checkValidatePass}
              />
            </div>
            <div>
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
              <div className="upload__tray">
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

            <div className="register__page__checkbox">
              <div>
                <Checkbox onChange={onChange} checked={check && true}>
                  <span>
                    I agree to{" "}
                    <Link to="/tec-client/terms"> Terms of service</Link> and{" "}
                    <Link to="/tec-client/privacy">Privacy Policy</Link>{" "}
                  </span>
                </Checkbox>
              </div>
            </div>
            <div className="register__page__submit">
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius: 20,
                  // disabled: validated ? false : true
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
            <p>
              <span style={{ fontWeight: 700 }}>registered already?</span>{" "}
              <span>
                <Link to="/tec-client/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
        <div className="register__page__right">
          <img src={EduLogo} />
        </div>
      </div>
    </div>
  );
};

export default RegisterP;
