import React, {useState} from 'react';
import { Input } from 'antd';
const { Search } = Input;
import { FaFacebook, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import "./Footer.css";

const Footer = () => {
    const [loading, setLoading] = useState(false)
  return (
    <footer className='footer'
        data-aos="fadeIn"
        data-aos-duration="2500"
    >
        <div className='footer_lower'>
            <div className='footer_lower_up'>
                <h3 className='quick_links_header'>QUICK LINKS</h3>
                <div>home</div>
                <div>about</div>
                <div>contact</div>
                <div>Tec in every home</div>
                <div>Tec in every School</div>
                <div>Tec in every community</div>
            </div>
            <div className='footer_lower_down'>
                <div className='footer_details'>
                    <h3 className='quick_links_header'>Informations</h3>
                    <div><FiPhoneCall /> &nbsp; +234 8107483900</div>
                    <div><FiMail /> &nbsp; info@tecworld.com</div>
                    <div className='footer_company_info'>Company information</div>
                    <div className='footer_company_terms'>Terms and Conditions</div>
                    <div className='footer_company_policy'>Privacy policy</div>
                </div>
            </div>
        </div>
        <div className='footer_copyright'>
            Copyright © 2022 Tecworld
        </div>
    </footer>
  )
}

export default Footer;