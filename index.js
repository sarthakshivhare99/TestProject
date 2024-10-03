import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

// const MyComponent = () => {
const DynamicTables = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [scraps, setScraps] = useState([]);
  const [selectedScrap, setSelectedScrap] = useState("");
  const [unloadingPoints, setUnloadingPoints] = useState([]);
  const [selectedUnloadingPoint, setSelectedUnloadingPoint] = useState("");
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [binDetails, setBinDetails] = useState([]);
  const [filteredBinDetails, setFilteredBinDetails] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.post("/api/getAllMasterPlants", {
          item: 1,
        });
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    const fetchBinDetails = async () => {
      try {
        const response = await axios.post("/api/getBinDetailsForSelect", {});
        setBinDetails(response.data);
      } catch (error) {
        console.error("Error fetching bin details:", error);
      }
    };

    fetchPlants();
    fetchBinDetails();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      if (selectedPlant) {
        try {
          const response = await axios.post("/api/getAllMasterPlants", {
            item: 2,
            plantid: selectedPlant,
          });
          setSections(response.data);
        } catch (error) {
          console.error("Error fetching sections:", error);
        }
      }
    };

    fetchSections();
  }, [selectedPlant]);

  useEffect(() => {
    const fetchScraps = async () => {
      try {
        const response = await axios.post("/api/getAllType", {
          baseloc: "p102",
        });
        setScraps(response.data);
      } catch (error) {
        console.error("Error fetching scraps:", error);
      }
    };

    const fetchUnloadingPoints = async () => {
      try {
        const response = await axios.post("/api/getUnloadingPointForDash", {
          baseloc: "p102",
        });
        setUnloadingPoints(response.data);
      } catch (error) {
        console.error("Error fetching unloading points:", error);
      }
    };

    const fetchVendors = async () => {
      try {
        const response = await axios.post("/api/getBinVendorCode", {
          baseloc: "p102",
        });
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchScraps();
    fetchUnloadingPoints();
    fetchVendors();
  }, []);

  useEffect(() => {
    // Filter bin details based on selected values
    let filteredData = binDetails;

    if (selectedPlant) {
      filteredData = filteredData.filter(
        (detail) => detail.plant_id === selectedPlant
      );
    }
    if (selectedSection) {
      filteredData = filteredData.filter(
        (detail) => detail.section_id === selectedSection
      );
    }
    if (selectedScrap) {
      filteredData = filteredData.filter(
        (detail) => detail.scrap_id === selectedScrap
      );
    }
    if (selectedUnloadingPoint) {
      filteredData = filteredData.filter(
        (detail) => detail.unloading_point_id === selectedUnloadingPoint
      );
    }
    if (selectedVendor) {
      filteredData = filteredData.filter(
        (detail) => detail.vendor_id === selectedVendor
      );
    }

    setFilteredBinDetails(filteredData);
  }, [
    selectedPlant,
    selectedSection,
    selectedScrap,
    selectedUnloadingPoint,
    selectedVendor,
    binDetails,
  ]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Plant</InputLabel>
        <Select
          value={selectedPlant}
          onChange={(e) => setSelectedPlant(e.target.value)}
        >
          {plants.map((plant) => (
            <MenuItem key={plant.plant_id} value={plant.plant_id}>
              {plant.Plant}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Section</InputLabel>
        <Select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {sections.map((section) => (
            <MenuItem key={section.section_id} value={section.section_id}>
              {section.Section}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Scrap</InputLabel>
        <Select
          value={selectedScrap}
          onChange={(e) => setSelectedScrap(e.target.value)}
        >
          {scraps.map((scrap, index) => (
            <MenuItem key={index} value={scrap}>
              {scrap}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Unloading Point</InputLabel>
        <Select
          value={selectedUnloadingPoint}
          onChange={(e) => setSelectedUnloadingPoint(e.target.value)}
        >
          {unloadingPoints.map((point, index) => (
            <MenuItem key={index} value={point}>
              {point}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Vendor</InputLabel>
        <Select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
        >
          {vendors.map((vendor, index) => (
            <MenuItem key={index} value={vendor}>
              {vendor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedPlant ? (
        <DataGrid
          rows={filteredBinDetails}
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            { field: "name", headerName: "Name", width: 150 },
            // Add more columns as needed
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      ) : (
        <Typography>Please select a plant to filter the data.</Typography>
      )}
    </Box>
  );
};
