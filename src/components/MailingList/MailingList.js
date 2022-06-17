import React, {useRef, useState} from "react";
import Logo from "../../assets/img/home.webp";
import {  message } from "antd";
import { BsArrowRightShort } from "react-icons/bs";
import { Input } from 'antd';
import "./MailingList.css";

const { Search } = Input;

const MailingList = () => {
    const [loading, setLoading] = useState(false)
    const searchRef = useRef()

    // const sendEmail = (e) => {
    //   e.preventDefault();
  
    //   emailjs.sendForm('gmail', 'template_wbti2ie', form.current, '0kDDdjI2hw-sG98Sf')
    //     .then((result) => {
    //         console.log(result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //     });
    // };

    const handleSubmit = async () => {
      
      const url = `https://tec-server-api.herokuapp.com/api/v1/email/subscribe`
      const email = searchRef.current.input.value
      const query = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email }), 
      })

      const data = await query.json();

      if(data.email) {
        message.success("Subscription Successful, Thanks for subscribing")
      }
      searchRef.current.input.value = ""
    }
  return (
    <div className="mailing_list">
      <div className="mailing_list_image"
      data-aos="fade-in"
      data-aos-duration="2500"
      >
          <img src={Logo} alt="child-pic" />
      </div>
      <div className="mailing_list_text">
         <h3
         data-aos="slide-left"
         data-aos-duration="1000"
         >Looking For Free Resources? Join Our Mailing List</h3>
         <p
         data-aos="slide-left"
         data-aos-duration="1500"
         >Subscribe Today to Receive Our Newsletter. You can unsubscribe at any time.</p>

         <div className="mailing_list_btn"
         data-aos="slide-left"
         data-aos-duration="1000"
         >
            <Search ref={searchRef} placeholder="Enter your email address" enterButton={<BsArrowRightShort  onClick={handleSubmit} />} size="large" {...loading && loading} />
         </div>
      </div>
    </div>
  );
};

export default MailingList;