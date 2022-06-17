import React, { useState } from "react";
import { HiMenuAlt1, HiSearch } from "react-icons/hi";
import { Modal, Button as Btn, Spin } from "antd";
import Logo from "../../assets/img/home.webp";
import { User } from "../../utils/apiLists";
import BorderImage from "../BorderImage/BorderImage";
import Button from "../Button/Button";
import List from "../List/List";
import "./AgeTutors.css";
// https://tec-server-api.herokuapp.com/
const dataImages = [
  {
    id: "01",
    imageUrl: Logo,
    alt: "facebook",
  },
  {
    id: "02",
    imageUrl: Logo,
    alt: "facebook",
  },
];

const styles = {
  backgroundColor: "#033462",
  border: "1px solid #033462",

  color: "#ffffff",

  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  margin: "auto",
  borderRadius: "5px",
  marginTop: "20px",
  marginBottom: "20px",
};

const AgeTutors = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [viewTutors, setViewTutors] = useState([]);
  const [hoverColor, setHoverColor] = useState("#00529b");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getTutors = async (sub, npage = 0) => {
    setLoading(true)
    setSearch(sub)
    const url = `https://tec-server-api.herokuapp.com/api/v1/${User.tutors}?filter=${sub}&limit=${1}&skip=${npage}`;

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

    return response;
  }

  const handleOk = () => {
    setPage(prev => prev + 1);
    getTutors(search, page + 1).then(res => {
      setViewTutors(prev => [...prev,...res.user]);
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPage(0)
  };

  const showModal = (id) => {
    setIsModalVisible(true);
    // const tutor = viewTutors.filter((e) => e._id === id);
    // setViewTutor([...tutor]);
  };
  const requestTutor = async (sub) => {
    const tutors = await getTutors(sub);
    setViewTutors([...tutors.user])
    setIsModalVisible(true);
  }
  return (
    <div className="age_tutors">
      <h2 data-aos="fade-in" data-aos-duration="1500">
        Browse Tutors By Age
      </h2>
      <div className="group_container">
        <div className="group_one">
          <div 
          onClick={() => requestTutor("Preschool")}
          className="left" data-aos="zoom-in" data-aos-duration="2500">
            <img src={Logo} />
            <h3>Preschool</h3>
          </div>
          <div 
          onClick={() => requestTutor("Elementary")}
          className="right" data-aos="zoom-in" data-aos-duration="2500">
            <img src={Logo} />
            <h3>Elementary</h3>
          </div>
        </div>
        <div 
        onClick={() => requestTutor("High")}
        className="group_two" style={{ marginTop: "40px" }}>
          <div className="left" data-aos="zoom-in" data-aos-duration="2500">
            <img src={Logo} />
            <h3>High School</h3>
          </div>
          <div 
          onClick={() => requestTutor("College")}
          className="right" data-aos="zoom-in" data-aos-duration="2500">
            <img src={Logo} />
            <h3>College Prep</h3>
          </div>
        </div>
      </div>
      {/* <Button
        title={"Search"}
        styles={{ ...styles, backgroundColor: hoverColor }}
        arrow={true}
        onMouseEnter={() => setHoverColor("#033462")}
        onMouseLeave={() => setHoverColor("#00529b")}
      /> */}
       <Modal
        className="search"
        title={`${search} Tutors`}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Btn key="back" onClick={handleCancel}>
            cancel
          </Btn>,
          <Btn key="forward" onClick={handleOk}>
          More
        </Btn>,
          
        ]}
      >
        {viewTutors.length === 0 ? <center><h2>No Data</h2></center>: viewTutors.map(tut => 
          <div className="modal-search" key={tut._id}  >
            <div className="name">
              <h3 style={{
                textTransform: 'capitalize'
              }}><i>{tut.name}</i></h3>
              <p><i>Specialities</i></p>
              <ul>
                {tut.tags.map((tag) => {
                  return <List name={tag} key={`${tut._id}${tag}`}/>
                })}

              </ul>
            </div>
            <div className="img"><img src={tut.img} alt={`${tut.name}'s picture as a tec tutor`}/></div>
            <div style={{position: 'absolute', top: "50%",left:"50%"}}>{loading ? <Spin />: ""}</div>
          </div>
          
        )}
      </Modal>
    </div>
  );
};

export default AgeTutors;
