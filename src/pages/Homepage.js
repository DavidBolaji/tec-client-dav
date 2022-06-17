import React, { useEffect } from "react";
import { BackTop, Button, message, notification } from "antd";
import { IoIosArrowUp } from "react-icons/io";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Answer from "../components/Answer/Answer";
import Saying from "../components/Saying/Saying";
import SubjectTutors from "../components/SubjectTutors/SubjectTutors";
import AgeTutors from "../components/AgeTutors/AgeTutors";
import ViewTutors from "../components/ViewTutors/ViewTutors";
import GetConnected from "../components/GetConnected/GetConnected";
import MailingList from "../components/MailingList/MailingList";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

const close = () => {
  console.log(close);
};

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("visited")) {
      localStorage.setItem(
        "visited",
        JSON.stringify({ time: new Date().getTime() + 1000 * 36000 })
      );
      setTimeout(() => {
        const btn = (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              history.push("/tec-client/contact");
              notification.close(
                `open${JSON.parse(localStorage.getItem("visited")).time}`
              );
            }}
          >
            Confirm
          </Button>
        );
        notification.open({
          message: "Notification",
          description:
            "Do you want one of our Tec Tutors, then click on the button below to contact us",
          btn,
          key: `open${JSON.parse(localStorage.getItem("visited")).time}`,
          duration: 0,
          onClose: close,
        });
      }, 2000);
    }

    if (JSON.parse(localStorage.getItem("visited")).time < new Date()) {
      localStorage.setItem(
        "visited",
        JSON.stringify({ time: new Date().getTime() + 1000 * 36000 })
      );
      setTimeout(() => {
        const btn = (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              history.push("/tec-client/contact");
              notification.close(
                `open${JSON.parse(localStorage.getItem("visited")).time}`
              );
            }}
          >
            Confirm
          </Button>
        );
        notification.open({
          message: "Notification",
          description:
            "Do you want one of our Tec Tutors, then click on the button below to contact us",
          btn,
          duration: 0,
          key: `open${JSON.parse(localStorage.getItem("visited")).time}`,
          onClose: close,
        });
      }, 2000);
    }
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tec | Home</title>
      </Helmet>
      <Navbar />
      <Hero />
      <Answer />
      <Saying />
      <SubjectTutors />
      <AgeTutors />
      <ViewTutors />
      <MailingList />
      <GetConnected />
      <BackTop>
        <div
          style={{
            height: 40,
            width: 40,
            lineHeight: "40px",
            borderRadius: 4,
            backgroundColor: "#1088e9",
            color: "#fff",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          <IoIosArrowUp />
        </div>
      </BackTop>
      <Footer />
    </React.Fragment>
  );
};

export default Homepage;
