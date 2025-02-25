import { Typography } from "@mui/material";
import React from "react";
import "./index.css"
import paypal from "../../assets/pngegg.png"
const PayPalButton = () => {
 
  
  return (
    <button className={"button-paypal"} >
    
     <img src={paypal} />
  
    </button>
  );
};

export default PayPalButton;
