import React, { useState, useRef, useEffect } from "react";
  import { Typography } from "@mui/material";
import "./index.css";
import PlusNda from "../../assets/svg/plus";

const AddNDAButtonTurn = ({ onClick }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  console.log("file",file)
  const fileInputRef = useRef(null);
useEffect(()=>{
if(file) {
  setFile(file)
  setFileName(file.name)
}
},[file])
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
     onClick(uploadedFile); // Optional: Trigger any action on file upload
    }
  };

  return (
    <button className="nda-button-turn" onClick={() => fileInputRef.current.click()}>
      <input
        type="file"
        style={{ display: 'none' }}
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <div className="flex-nda-turn">
        <PlusNda />
        <Typography color={"#8A8A8A"} fontWeight={400} fontSize={"25px"}>
         {fileName ? fileName : "Add NDAs to turn"}
        </Typography>
      </div>
    </button>
  );
};

export default AddNDAButtonTurn;
