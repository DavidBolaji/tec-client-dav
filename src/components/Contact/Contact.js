import { Button, Input, message } from "antd";
import React, { useState, useRef } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebook, FaRegAddressBook, FaTelegramPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { MdOutlineAlternateEmail, MdSmartphone } from "react-icons/md";
import "./Contact.css";

const Contact = () => {
  const [nameInput, setNameInput] = useState(8);
  const [nameText, setNameText] = useState("");
  const [load, setLoad] = useState(true);

  const [emailInput, setEmailInput] = useState(9);
  const [emailText, setEmailText] = useState("");
  const [loadEmail, setLoadEmail] = useState(true);

  const [subjectInput, setSubjectInput] = useState(5);
  const [subjectText, setSubjectText] = useState("");
  const [loadSubject, setLoadSubject] = useState(true);

  const [classInput, setClassInput] = useState(1);
  const [classText, setClassText] = useState("");
  const [loadClass, setLoadClass] = useState(true);

  const paraRef = useRef();
  const form = useRef();

  const handleNameInputChange = (e) => {
    const textValue = e.target.value;
    const wordCount = nameText.split("").length + 1;

    if (!e.target.value.match(/^[a-zA-Z ]*$/)) return;

    if (wordCount === 2) {
      console.log(load);
      load ? setLoad(false) : setLoad(true);
      if (!load) {
        setNameText("");
        setNameInput(8);
      }
    } else if (wordCount < nameInput) {
      setNameInput(wordCount);
    } else {
      setNameInput((prev) => prev + 1);
    }

    setNameText(textValue);
  };

  const handleEmailInputChange = (e) => {
    const emailValue = e.target.value;
    const wordCount = emailText.split("").length + 1;

    console.log(wordCount);

    if (!e.target.value.match(/^[a-zA-Z0-9_@.]*$/)) return;

    if (wordCount === 2) {
      console.log(load);
      loadEmail ? setLoadEmail(false) : setLoadEmail(true);
      if (!loadEmail) {
        setEmailText("");
        setEmailInput(9);
      }
    } else if (wordCount < emailInput) {
      setEmailInput(wordCount);
    } else {
      setEmailInput((prev) => prev + 1);
    }

    setEmailText(emailValue);
  };

  const handleSubjectInputChange = (e) => {
    const subjectValue = e.target.value;
    const wordCount = subjectText.split("").length + 1;

    if (!e.target.value.match(/^[a-zA-Z ]*$/)) return;

    if (wordCount === 2) {
      console.log(load);
      loadSubject ? setLoadSubject(false) : setLoadSubject(true);
      if (!loadSubject) {
        setSubjectText("");
        setSubjectInput(5);
      }
    } else if (wordCount < subjectInput) {
      setSubjectInput(wordCount);
    } else {
      setSubjectInput((prev) => prev + 1);
    }

    setSubjectText(subjectValue);
  };

  const handleClassInputChange = (e) => {
    const classValue = e.target.value;
    const wordCount = classText.split("").length + 1;

    if (!e.target.value.match(/^[a-zA-Z0-9 ]*$/)) return;

    if (wordCount === 2) {
      loadClass ? setLoadClass(false) : setLoadClass(true);
      if (!load) {
        setClassText("");
        setClassInput(1);
      }
    } else if (wordCount < classInput) {
      setClassInput(wordCount);
    } else {
      setClassInput((prev) => prev + 1);
    }

    setClassText(classValue);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (
      nameText === "" ||
      emailText === "" ||
      subjectText === "" ||
      classText === ""
    ) {
      message
        .loading("Action in progress..", 2.5)
        .then(() =>
          message.error("Message not sent.All fields are required", 2.5)
        );
    } else {

      emailjs.sendForm('service_vy45ojk', 'template_wbti2ie',  form.current, '0kDDdjI2hw-sG98Sf')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      message
      .loading('Action in progress..', 2.5)
      .then(() => message.success("sent", 2.5))
      .then(() => message.success('message sent', 2.5))
    }
  };
  return (
    <div className="contact">
      <div className="contact__social">
        <h2 data-aos="zoom-in">Connect</h2>
        <div
          className="contact__social__fb"
          data-aos="flip-right"
          data-aos-duration="2000"
        >
          <FaFacebook
            style={{
              color: "#4267B2",
            }}
          />{" "}
          <span>facebook</span>
        </div>
        <div
          className="contact__social__ws"
          data-aos="flip-right"
          data-aos-duration="2000"
        >
          <BsWhatsapp
            style={{
              color: "#25D366",
            }}
          />{" "}
          <span>whatsapp</span>
        </div>
        <div
          className="contact__social__tg"
          data-aos="flip-right"
          data-aos-duration="2000"
        >
          <FaTelegramPlane
            style={{
              color: "#34B7F1",
            }}
          />{" "}
          <span>Telegram</span>
        </div>
      </div>
      <div className="contact__meet">
        <h2 data-aos="zoom-in">Meet us</h2>
        <div
          className="contact__meet__phone"
          data-aos="flip-left"
          data-aos-duration="2000"
        >
          <MdSmartphone /> <span>+2347086513100</span>
        </div>
        <div
          className="contact__meet__mail"
          data-aos="flip-left"
          data-aos-duration="2000"
        >
          <MdOutlineAlternateEmail /> <span>info@tecworld.com.ng</span>
        </div>
        <div
          className="contact__meet__address"
          data-aos="flip-left"
          data-aos-duration="2000"
        >
          <FaRegAddressBook /> <span> osogbo osun state </span>
        </div>
      </div>
      <div className="contact__message">
        <h2>Pitch us</h2>
        <form ref={form} onSubmit={handleSend}>
          <p ref={paraRef}>
            Hello, <br />
            <input type={"hidden"} value="Tec World" name="to_name" />
            My name is{" "}
            <input
              value={nameText}
              placeholder="your name"
              name="from_name"
              size={nameInput}
              onChange={handleNameInputChange}
              required
            />
            and my e-mail address is{" "}
            <input
              placeholder="your e-mail"
              name="from_email"
              value={emailText}
              size={emailInput}
              onChange={handleEmailInputChange}
              required
            />
            and I would like to request a{" "}
            <input
              placeholder="science"
              name="course"
              size={subjectInput}
              onChange={handleSubjectInputChange}
              required
            />{" "}
            Tutor, for a student in{" "}
            <input
              value={classText}
              placeholder="ss2"
              size={classInput}
              onChange={handleClassInputChange}
              name="class"
              required
            />
            .
          </p>
          <input type="submit" size={`medium`} />
        </form>
      </div>
    </div>
  );
};

export default Contact;
