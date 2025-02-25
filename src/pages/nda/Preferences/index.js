import React, { useEffect, useState } from 'react';
import './index.css';
import SideBar from '../../../components/SideBar';
import { Typography, CircularProgress, Alert } from '@mui/material';
import Button from '../../../components/Button';
import Table from '../../../components/Tablle';
import axios from 'axios';
import { BASE_URL } from '../../../constants';
import {  useNavigate } from 'react-router-dom';

const Preferences = () => {
  const userId = localStorage.getItem('userId');
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const rowClick =(selectedRows) =>{
  console.log("selectedRows",selectedRows)
 }
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/rules/get?userId=${userId}`);
        const formattedRules = response.data.map(rule => ({
          category: rule.rules, // Adjust as per your actual data structure
          dateConfigured: new Date(rule.Created_at).toLocaleDateString('en-GB'),
          rulesArray: JSON.parse(rule.rulesArray) // Parse the JSON string back to an object
        }));
        setRules(formattedRules);
      } catch (error) {
        console.error('Error fetching rules:', error);
        setError('Failed to fetch rules. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, [userId]);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/CreateAccount');
    localStorage.setItem("update",1)
};
  const columns = [
    { field: 'category', label: 'Preferences', fontSize: '24px', fontWeight: 400, color: '#2F2F2F', cellFontSize: '22px', cellFontWeight: 400, cellColor: '#353535' },
    // { field: 'dateConfigured', label: 'Date Configured', fontSize: '24px', fontWeight: 400, color: '#2F2F2F', cellFontSize: '22px', cellFontWeight: 400, cellColor: '#353535' }
  ];

  const renderRulesArray = (rulesArray) => {
    return rulesArray.map((rule, index) => (
      <div key={index} style={{ marginBottom: '10px' ,gap:"20px"}}>
        <Typography variant="h6" fontWeight={500} sx={{display:"flex"}}>{rule.id}</Typography>
        <Typography variant="body1" style={{ display: 'flex' ,textAlign:"start"}} sx={{display:"flex" ,alignItems:"start"}}>{rule.text}</Typography>
      </div>
    ));
  };

  return (
    <div className='mian-nda'>
      <SideBar />
      <div className='preferences-table'>
        <div className='preferences-body'>
          <div className='preferences-body-spaceBetween' >
            <h2>
            Your Preferences
            </h2>
            <Button text={'Edit Preferences'} className={'button-components-newNDA'} onClick={handleNavigation}/>
          </div>
          <div className='preferences-body-table'>
           
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Table
                columns={columns}
                onRowClick={rowClick}
                rows={rules.map((rule, index) => ({
                  
                  ...rule,
                  category: (
                    <div>
                      {renderRulesArray(rule.rulesArray)}
                    </div>
                  )
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
