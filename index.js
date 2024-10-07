const handleEditRow = (row) => {
    setEditRow(row);
    setEditUnloadingPoint(row.unloading_point_id);
    setEditVendor(row.vendor_id);
    setOpenModal(true);
  };
 const handleUpdateData = async () => {
    const payload = {
      plant: editRow.plant_id,
      section: editRow.section_id,
      scrap: editRow.scrap_id,
      unloadingPoint: editUnloadingPoint,
      vendor: editVendor,
      type: 2, // Update type
    };

    try {
      await axios.post("/api/MasterDataManagement", payload);
      const response = await axios.post("/api/getBinDetailsForSelect", {});
      setBinDetails(response.data);
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating data or fetching bin details:", error);
    }
  };
