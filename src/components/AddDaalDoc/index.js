import { Typography } from "@mui/material";
import React from "react";
import "./index.css"
import Ndadoc from "../../assets/svg/ndadoc";
import {  useNavigate } from 'react-router-dom';

const AddNDAButton = ({onClick}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/homeNda');
};
  
  return (
    <button className={"nda-button"} onClick={onClick}>
    <div className="flex-nda">
    <Ndadoc/>
    <Typography  color={"#0D3EBA"}fontWeight={400} fontSize={"19px"} onClick={handleNavigation}>
    Add Deal Doc
    </Typography>
    </div>
      
  
    </button>
  );
};

export default AddNDAButton;
