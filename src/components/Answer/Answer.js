import React, { useState, useEffect } from "react";
import BorderImage from "../BorderImage/BorderImage";
import Button from "../Button/Button";
import "./Answer.css";
// import facebook from "../../assets/img/home.webp";
import facebook from "../../assets/img/facebook-logo.png";

// import Aos from "aos";
// import "aos/dist/aos.css";

const dataImages = [
  {
    id: "01",
    imageUrl: facebook,
    alt: "facebook",
  },
  {
    id: "02",
    imageUrl: facebook,
    alt: "facebook",
  },
  {
    id: "03",
    imageUrl: facebook,
    alt: "facebook",
  },
  {
    id: "04",
    imageUrl: facebook,
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

const Answer = () => {
  // useEffect(() => {
  //     Aos.init()
  // },[])

  const [hoverColor, setHoverColor] = useState("#00529b");
  const handleHover = (hoverCol) => {
    setHoverColor(hoverColor);
  };
  return (
    <div className="answer" data-aos="slide-up" data-aos-duration="2500">
      <div className="answer_image">
        {dataImages.map((image) => {
          return (
            <BorderImage key={image.id} src={image.imageUrl} alt={image.alt} />
          );
        })}
      </div>
      <div className="answer_text">
        <h3>
          No matter what your school questions might be, TecWorld Learning has
          the answer
        </h3>
        <p>
          As A School Director/Admin, If Preparing Your Pupils & Students For
          Careers & Jobs With Relevant Skills is your goal, setting your school
          in a standard no one can meet, having more parents enroll their
          children to your school, then #TECinEverySchool, with our unique 100%
          skills focus #TECict service, has the answer! Learning relevant skills
          needed for jobs and careers from year one upward is the best way you
          can have your pupils and students ready for their generation needs!
        </p>
        <Button
          title={"let's get started"}
          styles={{ ...styles, backgroundColor: hoverColor }}
          arrow={true}
          onMouseEnter={() => setHoverColor("#033462")}
          onMouseLeave={() => setHoverColor("#00529b")}
        />
      </div>
    </div>
  );
};

export default Answer;
