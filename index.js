const handleDeleteRow = (row) => {
    setDeleteRow(row);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    const payload = {
      plant: deleteRow.plant_id,
      section: deleteRow.section_id,
      scrap: deleteRow.scrap_id,
      unloadingPoint: deleteRow.unloading_point_id,
      vendor: deleteRow.vendor_id,
      type: 3,
    };

    try {
      await axios.post("/api/MasterDataManagement", payload);
      const response = await axios.post("/api/getBinDetailsForSelect", {});
      setBinDetails(response.data);
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error deleting data or fetching bin details:", error);
    }
  };
