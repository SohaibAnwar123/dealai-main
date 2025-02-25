import React from 'react';
import "./index.css";
import SideBar from '../../../components/SideBar';
import { Box, Typography } from '@mui/material';
import Orginal from '../../../assets/svg/orignal';
import Redline from '../../../assets/svg/redline';
import Executed from '../../../assets/svg/executed';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import DownloadIcon from '@mui/icons-material/Download';
import DocumentIcon from '../../../assets/svg/DocumentIcomn';
import img from "../../../assets/images/12-removebg-preview.png"
import exe1 from "../../../assets/images/2.png"
import red from "../../../assets/images/3.png"
import org from "../../../assets/images/4.png"

import exe2 from "../../../assets/images/download_buttons__1_-removebg-preview.png"

const DetailNDA = () => {
  const location = useLocation();
  const rowData = location.state;

  React.useEffect(() => {
    console.log('Row Data:', rowData);
  }, [rowData]);

  // Retrieving data from local storage
  const expirationYears = JSON.parse(localStorage.getItem('selectedYears'));
  const totalEdits = localStorage.getItem('totalChanges');
  const summary = rowData.Summary;
  const creationDate = new Date(rowData.Created_at);

  console.log("summary", summary);
  const edits = summary.split('Edit').slice(1).map(edit => edit.trim().split(':').slice(1).join(':').trim() + '.');
  const message = `Hi Your NDAs have been completed. Attached is a redlined version and an executed version. We made a total of edits to the document. You can view the edits below: \n\n ${summary}`;
console.log("edits",edits)
  const calculateExpirationDate = (creationDate, expirationYears) => {
    if (expirationYears) {
      const expirationYear = expirationYears; // Assuming you want to use the first expiration year from the list
      const expirationDate = new Date(creationDate);
      expirationDate.setFullYear(creationDate.getFullYear() + expirationYear);
      return expirationDate.toLocaleDateString();
    }
    return 'N/A'; // Default value if expiration year is not available
  };

  const expirationDate = calculateExpirationDate(creationDate, expirationYears);

  const handleDownload = async (filePath) => {
    const fileName = filePath.split('/').pop(); // Extracting the file name from the path
    const fileUrl = `${BASE_URL}/documents/download/${filePath.split('/').slice(-4).join('/')}`;

    try {
      const response = await fetch(fileUrl, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('File not found');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      if (fileName.endsWith('.pdf')) {
        // Open PDF in a new tab
        window.open(url, '_blank');
      } else {
        // Download other types of files
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
      alert('Error downloading the file. Please try again.');
    }
  };

  return (
    <div className='mian-nda'>
      <SideBar />
      <div className='preferences-table'>
        <div className='preferences-body'>
          <div className='preferences-body-spaceBetween'>
            <Typography color={"#0D3EBA"} fontWeight={500} fontSize={"30px"}>{rowData.counterParties}s</Typography>
          </div>
          <div className='preferences-body-spaceBetween-text'>
  <div className='grid-container'>
    <div className='grid-item'>
      <Typography color={"#353535"} fontWeight={500} fontSize={"24px"}>
        Counter Party: {rowData.counterParties}
      </Typography>
    </div>
    <div className='grid-item'>
      <Typography color={"#353535"} fontWeight={500} fontSize={"24px"}>
        Turned on: {creationDate.toLocaleDateString()}
      </Typography>
    </div>
    <div className='grid-item'>
      <Typography color={"#353535"} fontWeight={500} fontSize={"24px"}>
        NDA Expiration: {expirationDate}
      </Typography>
    </div>
    <div className='grid-item'>
      <Typography color={"#353535"} fontWeight={500} fontSize={"24px"}>
        Number of Edits: {rowData.TotalChanges}
      </Typography>
    </div>
  </div>
</div>

          <div className='document-section'>
            <div style={{ textAlign: "left" }}>
              <Typography color={"#0D3EBA"} fontWeight={400} fontSize={"26px"}>
                Document
              </Typography>
              <hr style={{ border: "1px solid #99AFE5", width: "610px", marginTop: "18px" }} />
            </div>
          </div>
          <div className='document-preview-section'>
  <div className='download-item' onClick={() => handleDownload(rowData.OriginalDocxFile)}  style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}} >
  <img src={org} style={{height:"86px"}} />
<div className='footer-exe'>
  
<Typography fontSize={"19px"} fontWeight={500}>
Original NDA
</Typography>
<img src={exe2} style={{height:"30px"}}/>
</div>
  </div>
  
  <div className='download-item' onClick={() => handleDownload(rowData.RedlinePath)}  style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}} >
  <img src={red} style={{height:"86px"}} />
<div className='footer-exe'>
  
<Typography fontSize={"19px"} fontWeight={500}>
Redline NDA
</Typography>
<img src={exe2} style={{height:"30px"}}/>
</div>
  </div>
  <div onClick={() => handleDownload(rowData.ExecutedPath)}  style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}  >
  
    <img src={exe1} style={{height:"86px"}} />
<div className='footer-exe'>
  
<Typography fontSize={"19px"} fontWeight={500}>
Executed NDA
</Typography>
<img src={exe2} style={{height:"30px"}}/>
</div>
  </div>
</div>
          <Box marginTop={"26px"} mb={2}>
            <Typography color={"#0D3EBA"} fontWeight={400} fontSize={"26px"}>
              Summary of changes made
            </Typography>
            <Box flexGrow={1} height="1px" bgcolor="#0D3EBA" marginRight={2} width={"610px"} marginTop={"18px"} />
          </Box>
          <div className='summary'>
  {edits.length > 0 ? (
    <ul>
      {edits.map((edit, index) => (
        <li key={index} style={{ color: "#353535", fontWeight: 400, fontSize: "20px" }}>
          {edit}
        </li>
      ))}
    </ul>
  ) : (
    <ul>
  <li>
    <Typography color={"#353535"} fontWeight={400} fontSize={"20px"}>
      {summary}
    </Typography>
     </li>
    </ul>
  )}
</div>
        </div>
      </div>
    </div>
  );
}

export default DetailNDA;
