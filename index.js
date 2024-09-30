 {currentView === "tslUser" && (
        <>
          <TextField
            label="User ID"
            value={newData.userId || ""}
            onChange={(e) => {
              setNewData({ ...newData, userId: e.target.value });
              setIsUserValid(null); // Reset validation when userId changes
            }}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={() => handleValidateUser(newData.userId)}
                    disabled={isValidating || !newData.userId}
                    sx={{ minWidth: 'auto' }}
                  >
                    {isValidating ? <CircularProgress size={24} /> : "Validate"}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
            </>)}
