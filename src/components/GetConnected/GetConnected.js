import React from "react";
import { FaFacebook, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

import "./GetConnected.css";


const GetConnected = () => {
  return <div className="get_connected">
      <div className="gc_text"
        data-aos="slide-up"
        data-aos-duration="1500"
      >Get connected</div>
      <div className="gc_social"
        data-aos="slide-up"
        data-aos-duration="1500"
      >
          <div className="whatsapp">
            <FaWhatsapp />
          </div>
          <div className="facebook">
            <FaFacebook />
          </div>
          <div className="telegram">
            <FaTelegramPlane />
          </div>
      </div>
    </div>
};

export default GetConnected;