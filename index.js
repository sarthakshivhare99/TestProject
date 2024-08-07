import React, { useState, useEffect } from 'react';
import { Button, Box, Modal, TextField, MenuItem, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const App = () => {
  const [plantData, setPlantData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [loadingData, setLoadingData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newData, setNewData] = useState({});

  const [currentView, setCurrentView] = useState(''); // 'plant', 'section', or 'loading'
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    if (currentView === 'plant') {
      axios.post('http://localhost:3001/plant', { item: "1" })
        .then(response => {
          setPlantData(response.data);
        });
    } else if (currentView === 'section' && selectedSection) {
      axios.get(`http://localhost:3001/${selectedSection}`).then(response => setSectionData(response.data));
    } else if (currentView === 'loading') {
      axios.get('http://localhost:3001/loading').then(response => setLoadingData(response.data));
    }
  }, [currentView, selectedSection]);

  const handleAddOrEdit = () => {
    const apiEndpoint = currentView === 'plant' ? 'http://localhost:3001/plant' : currentView === 'loading' ? 'http://localhost:3001/loading' : `http://localhost:3001/${selectedSection}`;
    const method = editData ? 'put' : 'post';
    axios[method](apiEndpoint, newData).then(response => {
      setModalOpen(false);
      setNewData({});
      setEditData(null);
      // Refresh data
      if (currentView === 'plant') {
        axios.post('http://localhost:3001/plant', { item: "1" })
          .then(response => setPlantData(response.data));
      } else if (currentView === 'section') {
        axios.get(`http://localhost:3001/${selectedSection}`).then(response => setSectionData(response.data));
      } else if (currentView === 'loading') {
        axios.get('http://localhost:3001/loading').then(response => setLoadingData(response.data));
      }
    });
  };

  const handleOpenModal = (row = null) => {
    if (row) {
      setEditData(row);
      setNewData(row);
    } else {
      setEditData(null); // Clear edit data
      setNewData({});
    }
    setModalOpen(true);
  };

  const columnsPlant = [
    { field: 'plant_id', headerName: 'Plant ID', width: 150 },
    { field: 'plant', headerName: 'Plant', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleOpenModal(params.row)}>Edit</Button>
      )
    }
  ];

  const columnsSection = [
    { field: 'sectionfield', headerName: 'Section Field', width: 150 },
    { field: 'fielddesc', headerName: 'Field Description', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleOpenModal(params.row)}>Edit</Button>
      )
    }
  ];

  const columnsLoading = [
    { field: 'loadingpoint', headerName: 'Loading Point', width: 150 },
    { field: 'startingpoint', headerName: 'Starting Point', width: 150 },
    { field: 'unloadpoint', headerName: 'Point of Unload', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleOpenModal(params.row)}>Edit</Button>
      )
    }
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
        <Button 
          variant="contained" 
          color={currentView === 'plant' ? 'primary' : 'default'}
          onClick={() => setCurrentView('plant')}
        >
          Plant
        </Button>
        <Button 
          variant="contained" 
          color={currentView === 'section' ? 'primary' : 'default'}
          onClick={() => setCurrentView('section')}
        >
          Section
        </Button>
        <Button 
          variant="contained" 
          color={currentView === 'loading' ? 'primary' : 'default'}
          onClick={() => setCurrentView('loading')}
        >
          Loading
        </Button>
      </Box>
      {currentView && (
        <Box>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2, 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '5px' 
            }}
          >
            <Typography variant="h6">{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</Typography>
            <Button variant="outlined" onClick={() => handleOpenModal()}>Add</Button>
          </Box>
          {currentView === 'section' && (
            <TextField
              select
              label="Select Section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              style={{ margin: '20px 0' }}
            >
              {/* Assuming sections is a predefined list of section options */}
              {['section1', 'section2'].map((section) => (
                <MenuItem key={section} value={section}>{section}</MenuItem>
              ))}
            </TextField>
          )}
          <Box sx={{ height: 400, backgroundColor: 'white', borderRadius: '5px', padding: '10px' }}>
            <DataGrid
              rows={currentView === 'plant' ? plantData : currentView === 'loading' ? loadingData : sectionData}
              columns={currentView === 'plant' ? columnsPlant : currentView === 'loading' ? columnsLoading : columnsSection}
              autoHeight
              disableSelectionOnClick
            />
          </Box>
        </Box>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Box sx={{ width: 300, margin: 'auto', padding: 4, backgroundColor: 'white', borderRadius: '10px' }}>
          {currentView === 'plant' && (
            <>
              <TextField
                label="Plant ID"
                value={newData.plant_id}
                onChange={(e) => setNewData({ ...newData, plant_id: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Plant"
                value={newData.plant}
                onChange={(e) => setNewData({ ...newData, plant: e.target.value })}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {currentView === 'loading' && (
            <>
              <TextField
                label="Loading Point"
                value={newData.loadingpoint}
                onChange={(e) => setNewData({ ...newData, loadingpoint: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Starting Point"
                value={newData.startingpoint}
                onChange={(e) => setNewData({ ...newData, startingpoint: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Point of Unload"
                value={newData.unloadpoint}
                onChange={(e) => setNewData({ ...newData, unloadpoint: e.target.value })}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {currentView === 'section' && (
            <>
              <TextField
                label="Section Field"
                value={newData.sectionfield}
                onChange={(e) => setNewData({ ...newData, sectionfield: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Field Description"
                value={newData.fielddesc}
                onChange={(e) => setNewData({ ...newData, fielddesc: e.target.value })}
                fullWidth
                margin="normal"
              />
            </>
          )}
          <Button onClick={handleAddOrEdit} fullWidth variant="contained" color="primary">
            {editData ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default App;
