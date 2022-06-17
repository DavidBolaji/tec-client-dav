import React, { useEffect, useState } from "react";
import { Card, Skeleton, Button, Modal, Spin } from "antd";
import Background from "../../assets/img/home.webp";
const { Meta } = Card;
import "antd/dist/antd.css";
import "./ViewTutors.css";
import { User } from "../../utils/apiLists";
import { truncate } from "../../utils/truncate";

const ViewTutors = () => {
  const [loading, setLoading] = useState(true);
  const [viewTutors, setViewTutors] = useState([]);
  const [viewTutor, setViewTutor] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [screen, setScreen] = useState(window.screen.width);

  useEffect(() => {
    const checkResize = (e) => {
      setScreen(window.screen.width);
    };

    window.addEventListener("resize", checkResize);

    return () => window.removeEventListener("resize", checkResize);
  }, []);

  const showModal = (id) => {
    setIsModalVisible(true);
    const tutor = viewTutors.filter((e) => e._id === id);
    setViewTutor([...tutor]);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getTutors = async () => {
    const url = `https://tec-server-api.herokuapp.com/api/v1/${User.tutors}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "apllication/json",
      },
    });

    const response = await res.json();

    if (response) {
      setLoading(false);
    }

    console.log(response);

    return response;
  };

  useEffect(() => {
    getTutors().then((res) => {
      console.log(res.user);
      setViewTutors([...res.user]);
    });
  }, [viewTutor]);
  console.log(viewTutor);
  return (
    <div className="view_tutors">
      <h2 data-aos="fade-in" data-aos-duration="1500">
        View Tec Tutors
      </h2>
      {viewTutors.length === 0 ? <Spin /> : <div className="view_tutors_portfolio">
        {viewTutors.map((tutor) => {
          return (
            tutor.active && (
              <Skeleton
                key={tutor._id}
                loading={loading}
                active
                paragraph={{ rows: 12 }}
              >
                <Card
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  hoverable
                  style={{ width: 400, margin: 10 }}
                  cover={
                    <img
                      alt="example"
                      src={tutor.img}
                      style={
                        {
                          // width: '100%',
                          // height: '100%',
                          // objectFit: 'cover'
                        }
                      }
                    />
                  }
                >
                  <Meta
                    title={tutor.name}
                    description={
                      tutor.description == ""
                        ? ""
                        : truncate(`${tutor.description}`, 20)
                    }
                  />
                  <Button type="link" onClick={showModal.bind(null, tutor._id)}>
                    More
                  </Button>
                </Card>
              </Skeleton>
            )
          );
        })}
      </div>}
      <Modal
        title={viewTutor[0]?.name}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            marginBottom: 20,
          }}
          src={viewTutor[0]?.img}
          alt={"picture of" + viewTutor[0]?.name + "who is a tutor at tec"}
        />

        <p>
          {viewTutor[0]?.description ||
            '"www.instagram.com Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
        </p>
      </Modal>
    </div>
  );
};

export default ViewTutors;
