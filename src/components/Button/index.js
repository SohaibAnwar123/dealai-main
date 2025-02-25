import { Typography } from "@mui/material";
import React from "react";
import "./index.css"
const Button = ({ text,className ,onClick}) => {
 
  
  return (
    <button className={className} onClick={onClick}>
    
      <Typography color="inherit"  fontWeight={400} fontSize={"inherit"}>
  {text}
</Typography>
  
    </button>
  );
};

export default Button;
