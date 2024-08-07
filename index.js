  {currentView === "section" && (
        <Box sx={{ mb: 2 }}>
          <Select
            label="Select a Plant"
            value={selectedPlant}
            onChange={handlePlantSelection}
            fullWidth
          >
            {plantData.map((plant) => (
              <MenuItem key={plant.plant_id} value={plant.plant_id}>
                {plant.Plant}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
