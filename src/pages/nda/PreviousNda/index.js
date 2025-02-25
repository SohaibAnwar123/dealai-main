import React, { useEffect, useState } from 'react';
import "./index.css";
import SideBar from '../../../components/SideBar';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import Table from '../../../components/Tablle';
import SearchBar from '../../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../constants';

const PreviousNDA = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);
  
  const userId = localStorage.getItem('userId');

  const handleNavigation = () => {
    navigate('/homeNda');
};
  
  useEffect(() => {
    console.log("userId from localStorage:", userId); // Logging userId
    fetchRenderedDoc(userId);
  }, [userId]);

  const fetchRenderedDoc = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/documents/getRenderedDoc/${userId}`);
      const data = response.data;
      console.log("data from API:", data); // Logging data received from API

      setAllData(data); // Save all data to state

      // Format data to match the table requirements
      const formattedData = data.map(item => ({
        id: item.id, // Assuming each item has an `id`
        Title: item.counterParties,  // Assuming 'RedlineHTML' should be displayed in the 'Title' column
        CounterParty: item.counterParties,
        CreatedAt: new Date(item.Created_at).toLocaleDateString() // Formatting the date
      }));

      setRows(formattedData);
    } catch (error) {
      console.error('Error fetching rendered documents:', error);
    }
  };

  const handleRowClick = (rowData) => {
    // Find the complete data for the selected row
    const selectedRowData = allData.find(item => item.id === rowData.id);
    navigate('/DetailNDA', { state: selectedRowData });
  };

  return (
    <div className='mian-nda'>
      <SideBar />
      <div className='preferences-table'>
        <div className='preferences-body'>
          <div className='preferences-body-spaceBetween'>
            <h2>
            Previous NDAs
            </h2>
            {/* <Button text={"+ New NDA"} className={"button-components-newNDA"} onClick={handleNavigation} /> */}
          </div>
          <div className='preferences-body-table'>
            <div className='preferences-body-table-flex'>
              <Typography fontSize={"24px"} fontWeight={500} sx={{ marginBottom: '10px' }}>
                List of Previous NDAs
              </Typography>
              <SearchBar />
            </div>
            <Table
              columns={[
                { field: "Title", label: "Title", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" },
                { field: "CounterParty", label: "Counter Party", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" },
                { field: "CreatedAt", label: "Date Turned", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" }
              ]}
              rows={rows}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviousNDA;
