import React, { useEffect, useState, useId } from "react";
import { Modal, Button as Btn, Spin } from "antd";
import { HiMenuAlt1, HiSearch } from "react-icons/hi";
import Logo from "../../assets/img/home.webp";
import BorderImage from "../BorderImage/BorderImage";
import Button from "../Button/Button";
import "./SubjectTutors.css";
import { User } from "../../utils/apiLists";
import List from "../List/List";

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

const SubjectTutors = () => {
  
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

    console.log(response);

    if (response) {
      setLoading(false);
    }

    console.log(response);

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
    <div className="subject_tutors">
      <h2 data-aos="fade-in" data-aos-duration="1500">
        Browse Tutors By Subject
      </h2>
      <div className="group_container">
        <div className="group_one">
          <div
            className="left"
            data-aos="zoom-in"
            data-aos-duration="2500"
            onClick={() => requestTutor("Mathematics")}
          >
            <img src={Logo} />
            <h3>Math Tutoring</h3>
          </div>
          <div
            className="right"
            data-aos="zoom-in"
            data-aos-duration="2500"
            onClick={() => requestTutor("English")}
          >
            <img src={Logo} />
            <h3>English Tutoring</h3>
          </div>
        </div>
        <div className="group_two" style={{ marginTop: "40px" }}>
          <div className="left" data-aos="zoom-in" data-aos-duration="2500"
           onClick={() => requestTutor("junior_science")}
          >
            <img src={Logo} />
            <h3>Basic Science</h3>
          </div>
          <div className="right" data-aos="zoom-in" data-aos-duration="2500"
           onClick={() => requestTutor("senior_science")}
          >
            <img src={Logo} />
            <h3>Senior Science</h3>
          </div>
        </div>
      </div>
      {/* <Button
        title={"See More"}
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

export default SubjectTutors;
