import React, {useEffect, useState} from "react";
import { FaArrowRight, FaWindows } from "react-icons/fa";
import "./Button.css";

const Button = (props) => {

  let newStyle;

  const [width, setWidth] = useState(window.screen.width)
  
  useEffect(() => {

    const checkResize = (e) => {
      setWidth(window.screen.width);
    }

    window.addEventListener('resize', checkResize);

    return () => window.removeEventListener('resize', checkResize);
  
    
  }, [])

  let styles;

  if (width >= 990) {
    styles = {
      padding: "10px 70px 10px 70px",
      fontSize: "20px",
      textTransform: "uppercase",
      cursor: "pointer",
      color: props.onMouseEnter && props.onMouseEnter,
      color: props.onMouseLeave && props.onMouseLeave,
      
      // textTransform: "uppercase"
    };

  } else if (width >= 810) {
    styles = {
      padding: "10px 70px 10px 70px",
      pointer: "cursor",
      textTransform: "uppercase",
      color: props.onMouseEnter && props.onMouseEnter,
      color: props.onMouseLeave && props.onMouseLeave,
      
      // textTransform: "uppercase"
    };

  } else if (width >= 550) {
    styles = {
      padding: "5px 20px 5px 20px",
      textTransform: "uppercase",
      color: props.onMouseEnter && props.onMouseEnter,
      color: props.onMouseLeave && props.onMouseLeave
    };
    
  } else {
    styles = {
      padding: "5px 20px 5px 20px",
      textTransform: "uppercase",
      color: props.onMouseEnter && props.onMouseEnter,
      color: props.onMouseLeave && props.onMouseLeave
    };
  }
  
  

  if (props.styles) {
    newStyle = { ...styles, ...props.styles };
  } else {
    newStyle = styles;
  }

  return (
    <button 
    style={newStyle} 
    onClick={props.onClick} 
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    >
      {props.title}
      {props.arrow ? <span>&nbsp;&nbsp;</span> : null } 
      {props.arrow ? <FaArrowRight /> : null }
    </button>
  );
};

export default Button;
