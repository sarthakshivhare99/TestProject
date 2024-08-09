 const columnsVendor = [
    { field: "vendor", headerName: "Vendor", width: 150 }, // Only Vendor column
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleOpenModal(params.row)}>Edit</Button>
      ),
    },
  ];
