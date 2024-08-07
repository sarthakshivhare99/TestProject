axios
      .post("http://localhost:3001/masterApiEndpoint", {
        plant_id: selectedPlantId,
        item: 2,
      })
      .then((response) => {
        // Assuming the response contains the data to display in the grid
        setLoadingData(response.data); // Update this based on your API response
      })
      .catch((error) => {
        console.error("Error fetching data for selected plant:", error);
      });
