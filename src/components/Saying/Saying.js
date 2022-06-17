import React from "react";
import { HiMenuAlt1, HiSearch } from "react-icons/hi";
import Logo from "../../assets/img/home.webp";
import "./Saying.css";

// data-aos="fade-up"
      // data-aos-easing="linear"
      // data-aos-duration="1500"

const Saying = () => {
  return (
    <div className="saying">
      <div className="saying_image"
      data-aos="fade-in"
      data-aos-duration="2500"
      >
          <img src={Logo} alt="child-pic" />
      </div>
      <div className="saying_text"
      >
         <h3
         data-aos="fade-in"
         data-aos-easing="linear"
         data-aos-duration="500"
         >What Parents <br />  And Students Are Saying...</h3>
          
        <q
        data-aos="fade-in"
        data-aos-easing="linear"
        data-aos-duration="500"
        >Dara cleared all the nine papers to God be the glory. Thank you TEC nad all your tutors sent to help my child. Now, he's ready for University with all the company has done for him since ss1.</q>
          
         <h5
         data-aos="fade-in"
         data-aos-easing="linear"
         data-aos-duration="500"
         >Dr. Adeoye</h5>

         <q
         data-aos="fade-in"
         data-aos-easing="linear"
         data-aos-duration="1000"
         >My son had A1 in physics. Thank you so much for all your tutor efforts and dedication with the company's follow up. The Lord continue to prosper your ways. Amen</q>
          
         <h5
         data-aos="fade-in"
         data-aos-easing="linear"
         data-aos-duration="1000"
         >Mrs Akinsanya</h5>
      </div>
    </div>
  );
};

export default Saying;
