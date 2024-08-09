{currentView === "vendor" && (
            <>
              <TextField
                label="Vendor"
                value={newData.vendor || ""}
                onChange={(e) =>
                  setNewData({ ...newData, vendor: e.target.value })
                }
                fullWidth
                margin="normal"
              />
            </>
          )}
