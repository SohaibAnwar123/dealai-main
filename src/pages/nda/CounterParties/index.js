import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import Table from '../../../components/Tablle';
import SearchBar from '../../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../constants';

const CounterPartiesPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounterparty, setSelectedCounterparty] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    console.log("userId from localStorage:", userId); // Logging userId
    fetchRenderedDoc(userId);  
  }, [userId]);

  const fetchRenderedDoc = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/documents/getRenderedDoc/${userId}`);
      const data = response.data;

      console.log("Data received from API:", data); // Logging data received from API

      setAllData(data); // Save all data to state

      // Create a map to group data by counterparties
      const counterPartyMap = new Map();

      data.forEach(item => {
        const counterParty = item.counterParties;
        if (!counterPartyMap.has(counterParty)) {
          counterPartyMap.set(counterParty, { count: 0, ids: [], lastNDA: '' });
        }
        counterPartyMap.get(counterParty).count += 1;
        counterPartyMap.get(counterParty).ids.push(item.id);
        counterPartyMap.get(counterParty).lastNDA = new Date(item.Created_at).toLocaleDateString(); // Assuming Created_at is the date
      });

      // Format data to match the table requirements
      const formattedData = Array.from(counterPartyMap.entries()).map(([counterParty, value]) => ({
        CounterParty: counterParty,
        NDAsTurned: value.count,
        LastNDA: value.lastNDA,
        ids: value.ids,
      }));

      console.log("Formatted data:", formattedData);
      setRows(formattedData);
    } catch (error) {
      console.error('Error fetching rendered documents:', error.message);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredData = allData.filter(item =>
      item.counterParties.toLowerCase().includes(searchTerm)
    );

    // Create a map to group filtered data by counterparties
    const counterPartyMap = new Map();

    filteredData.forEach(item => {
      const counterParty = item.counterParties;
      if (!counterPartyMap.has(counterParty)) {
        counterPartyMap.set(counterParty, { count: 0, ids: [], lastNDA: '' });
      }
      counterPartyMap.get(counterParty).count += 1;
      counterPartyMap.get(counterParty).ids.push(item.id);
      counterPartyMap.get(counterParty).lastNDA = new Date(item.Created_at).toLocaleDateString(); // Assuming Created_at is the date
    });

    // Format data to match the table requirements
    const formattedData = Array.from(counterPartyMap.entries()).map(([counterParty, value]) => ({
      CounterParty: counterParty,
      NDAsTurned: value.count,
      LastNDA: value.lastNDA,
      ids: value.ids,
    }));

    setRows(formattedData);
  };

  const handleCounterpartyRowClick = (row) => {
    const ndas = allData.filter(item => row.ids.includes(item.id));
    setSelectedCounterparty({ counterparty: row.CounterParty, ndas });
  };

  const handleNdaRowClick = (rowData) => {
    // Find the complete data for the selected row
    const selectedRowData = allData.find(item => item.id === rowData.id);
    navigate('/DetailNDA', { state: selectedRowData });
  };

  const handleBackClick = () => {
    setSelectedCounterparty(null);
  };

  const handleNavigation = () => {
    navigate('/homeNda');
};
  
  
  return (
    <div className='mian-nda'>
      <SideBar />
      <div className='preferences-table'>
        <div className='preferences-body'>
          <div className='preferences-body-spaceBetween'>
            <Typography color={"#0D3EBA"} fontWeight={500} fontSize={"30px"}>
              {selectedCounterparty ? "NDA Details" : "Counterparties"}
            </Typography>
            {/* {!selectedCounterparty && <Button text={"+ New NDA"} className={"button-components-newNDA"} onClick={handleNavigation}/>} */}
          </div>
          {selectedCounterparty ? (
            <div className='nda-details'>
              <Table
                columns={[
                  { field: "counterParties", label: "Counter Party", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" },
                  { field: "Created_at", label: "Created At", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" },
                  { field: "document_name", label: "Document", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" },
                ]}
                rows={selectedCounterparty.ndas.map(nda => ({
                  id: nda.id,
                  counterParties: nda.counterParties,
                  Created_at: new Date(nda.Created_at).toLocaleDateString(),
                  document_name: nda.document_name,
                }))}
                onRowClick={handleNdaRowClick} // Add this prop to handle row click events
              />
            </div>
            
          ) : (
            <div className='preferences-body-table'>
              <div className='preferences-body-table-flex'>
                <Typography fontSize={"24px"} fontWeight={500} sx={{ marginBottom: '10px' }}>
                  List of Counter Party
                </Typography>
                <SearchBar value={searchTerm} onChange={handleSearch} />
              </div>
              <Table
                columns={[
                  { field: "NDAsTurned", label: "NDAs Turned", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" },
                  { field: "CounterParty", label: "Counter Party", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" },
                  { field: "LastNDA", label: "Last NDA Turn Date", fontSize: "24px", fontWeight: 400, color: "#2F2F2F" }
                ]}
                rows={rows} // Use the state 'rows' containing formatted data
                onRowClick={handleCounterpartyRowClick} // Add this prop to handle row click events
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounterPartiesPage;
