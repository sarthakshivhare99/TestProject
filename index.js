 <FormControlLabel 
                control={
                  <Switch 
                    checked={status} 
                    onChange={(e) => {
                      setStatus(e.target.checked);
                      setNewData({ ...newData, status: e.target.checked ? "Yes" : "No" }); // Update newData with status as Yes/No
                    }} 
                  />
                }
                label={status ? "Status: Yes" : "Status: No"} 
              />
