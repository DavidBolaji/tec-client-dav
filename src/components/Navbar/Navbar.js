import React, { useEffect, useState } from "react";
import { HiMenuAlt1, HiSearch } from "react-icons/hi";
import { IoClose} from "react-icons/io5";
import { MdArrowDropDown, MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [transparent, setTransparent] = useState(false);

  useEffect(() => {

    const handleTransparent = () => {
     
        if (window.document.scrollingElement.scrollTop > 50) {
            setTransparent(true)
        } else {
          setTransparent(false)
        }
    }

    window.addEventListener('scroll', handleTransparent)

    return () => window.removeEventListener('scroll', handleTransparent)
  },[])

  const handleClick = () => {
    setNav(prev => !prev);
    dropdown && setDropdown(false);
  }

  const handleDropdown = () => {
    setDropdown(prev => !prev)
  }


  return (
    <>
    <div className={`desktop__nav ${transparent && 'active'}`}>
      <div className="desktop__logo">
        <img src={Logo} alt="tec-logo" width="100px"/>
      </div>
      <div className={`desktop__links ${transparent && 'active'}`}>
        <div className="main"><Link to="/tec-client/home">Home</Link></div>
        <div className="main"><Link to="/tec-client/about">About</Link></div>
        <div className="main"><Link to="/tec-client/contact">Contact</Link></div>
        <div className="main"><Link to="/tec-client/blog">Blog</Link></div>
        <div className="main"><Link to="/tec-client/gallery">Gallery</Link></div>
        <div className="dropdown main" onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
          <a href="#">Tec Groups </a>
          <MdOutlineArrowRight style={{
            color: !dropdown ?"#fff": 'red',
            marginTop: dropdown ? "3px" : "3px",
            transform: !dropdown ? "rotate(0deg)" :"rotate(90deg)",
            transition: "transform 0.8s ease"
          }} />
          <div className={`dropdown__group ${dropdown && 'active'}`} >
            <div><Link to="/tec-client/tec_in_every_home">Tec in every home</Link></div>
            <div><Link to="/tec-client/tec_in_every_school">Tec in every School</Link></div>
            <div><Link to="/tec-client/tec_in_every_community">Tec in every Community</Link></div>
          </div>
        </div>
        <div className="main"><Link to="/tec-client/login">Login</Link></div>
      </div>
    </div>
    
    <div className="navbar">
      <div className="navbar_menu" onClick={handleClick}>
        <HiMenuAlt1 color="#fff" fontSize="20px" />
      </div>
      <div className="navbar_logo">
        <img src={Logo} alt="tec-logo" />
        {/* <span>TecWorld</span> */}
      </div>
      <div className="navbar_search">
        <HiSearch color="#fff" fontSize="20px" />
      </div>
    </div>
    <div className={`navbar__slider ${nav && 'active'}`}>
      <IoClose style={{
        color: "#fff",
        position: "absolute",
        right: "-30px",
        top: "10px",
        cursor: "pointer",
        fontSize: "18px",
        backgroundColor: "#202054",
        borderRadius: "50%"
      }}
      onClick={handleClick}
      />

      <div className="links">
        <div><Link to="/tec-client/home">Home</Link></div>
        <div><Link to="/tec-client/about">About</Link></div>
        <div><Link to="/tec-client/contact">Contact</Link></div>
        <div><Link to="/tec-client/blog">Blog</Link></div>
        <div><Link to="/tec-client/gallery">Gallery</Link></div>
        <div className="dropdown" onClick={handleDropdown}>
          <a >Tec Groups </a>
          <MdOutlineArrowRight style={{
            color: "#fff",
            marginTop: dropdown ? "3px" : "3px",
            transform: !dropdown ? "rotate(0deg)" :"rotate(90deg)",
            transition: "transform 0.8s ease"
          }} />
          <div className={`dropdown__group ${dropdown && 'active'}`} >
            <div><Link to="/tec-client/tec_in_every_home">Tec in every home</Link></div>
            <div><Link to="/tec-client/tec_in_every_school">Tec in every School</Link></div>
            <div><Link to="/tec-client/tec_in_every_community">Tec in every Community</Link></div>
          </div>
        </div>
        <div
        style={{
          transform: dropdown ? "translateY(115px)" : "",
          transition: "transform 0.1s ease"
        }}
        ><Link to="/tec-client/login">Login</Link></div>
      </div>
    </div>
    <div className={`navbar__backdrop ${nav && 'active'}`} onClick={handleClick}></div>
    </>
  );
};

export default Navbar;
