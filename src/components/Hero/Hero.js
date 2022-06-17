import React, { useState } from "react";
import BackgroundOne from "../../assets/img/home1.jpg";
import BackgroundTwo from "../../assets/img/school.jpg";
import BackgroundThree from "../../assets/img/comm.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Hero.css";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Hero = () => {
  const styles = {
    backgroundColor: "#ffc525",
    border: "1px solid #ffc525",
    color: "#8a5d24",
    fontWeight: "600",
  };
  const activeCarou = useSelector((state) => state);
  const dispatch = useDispatch();

  const [active, setActive] = useState(1);
  const [pointer, setPointer] = useState("");

  const history = useHistory();

  const handleLeft = () => {
    const newActive = activeCarou - 1;
    newActive < 0
      ? dispatch({ type: "PREV", payload: 2 })
      : dispatch({ type: "PREV", payload: newActive });
  };
  console.log(activeCarou);

  const handleRight = () => {
    const newActive = activeCarou + 1;
    newActive === 3
      ? dispatch({ type: "NEXT", payload: 0 })
      : dispatch({ type: "NEXT", payload: newActive });
  };

  const handleDot = (val) => {
    dispatch({ type: "NEXT", payload: val });
  };

  const handleNavOne = () => {
    history.push("/tec-client/tec_in_every_home");
  };

  const handleNavTwo = () => {
    history.push("/tec-client/tec_in_every_school");
  };

  const handleNavThree = () => {
    history.push("/tec-client/tec_in_every_community");
  };
  return (
    <div className="hero_cont">
      <div className="hero">
        <div className="hero_image" style={{ width: "300%" }}>
          <div className={`image_group ${activeCarou === 0 ? "active" : ""}`}>
            <img src={BackgroundOne} alt="tec-logo" />
            <div className="hero_backdrop"></div>
          </div>
          <div className={`image_group ${activeCarou === 1 ? "active" : ""}`}>
            <img src={BackgroundThree} alt="tec-logo" />
            <div className="hero_backdrop"></div>
          </div>
          <div className={`image_group ${activeCarou === 2 ? "active" : ""}`}>
            <img src={BackgroundTwo} alt="tec-logo" />
            <div className="hero_backdrop"></div>
          </div>
        </div>
        <div className="hero_text">
          <div className={`text_group ${activeCarou === 0 ? "active" : ""}`}>
            <h2>Every Child needs personalized education</h2>
            <p>
              We're excited to help empower TEC parents and TEC students to be
              active, engaged partners in learning, offering new ways to
              personalize how schools teach and inspire today's student
            </p>
          </div>

          <div className={`text_group ${activeCarou === 1 ? "active" : ""}`}>
            <h2>Tecworld Learning focus on center activities</h2>
            <p>
              TEC IN EVERY COMMUNITY allow us to train and have seminars for
              companies, organizations, business owners etc.
            </p>
          </div>

          <div className={`text_group ${activeCarou === 2 ? "active" : ""}`}>
            <h2>Schools are the greatest institutions</h2>
            <p>
              At TEC, and with TEC IN EVERY SCHOOL innovation, our mission is to
              transform your vision and meet every student/pupil specific need,
              creating pathways to good success!
            </p>
          </div>

          <div className="hero_btn">
            {activeCarou === 0 && (
              <Button
                styles={{ ...styles, cursor: pointer }}
                title="Learn More"
                onMouseEnter={() => setPointer("pointer")}
                onMouseLeave={() => setPointer("")}
                onClick={handleNavOne}
              />
            )}
            {activeCarou === 1 && (
              <Button
                styles={{ ...styles, cursor: pointer }}
                title="Learn More"
                onMouseEnter={() => setPointer("pointer")}
                onMouseLeave={() => setPointer("")}
                onClick={handleNavThree}
              />
            )}
            {activeCarou === 2 && (
              <Button
                styles={{ ...styles, cursor: pointer }}
                title="Learn More"
                onMouseEnter={() => setPointer("pointer")}
                onMouseLeave={() => setPointer("")}
                onClick={handleNavTwo}
              />
            )}
          </div>
        </div>
        <div className="hero_controls">
          <div className="hero_prev">
            <FaArrowLeft color="white" fontSize="20px" onClick={handleLeft} />
          </div>
          <div className="hero_next">
            <FaArrowRight color="#fff" fontSize="20px" onClick={handleRight} />
          </div>
        </div>
        <div className="hero_dot">
          <div
            className={`dot ${activeCarou === 0 ? "active" : ""}`}
            onClick={() => handleDot(0)}
          ></div>
          <div
            className={`dot ${activeCarou === 1 ? "active" : ""}`}
            onClick={() => handleDot(1)}
          ></div>
          <div
            className={`dot ${activeCarou === 2 ? "active" : ""}`}
            onClick={() => handleDot(2)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
