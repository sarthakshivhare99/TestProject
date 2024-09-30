<Select
                label="Role"
                value={selectedRole || ""}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setNewData({ ...newData, role: e.target.value }); // Update newData with selected role
                }}
                fullWidth
                margin="normal"
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem> // Adjust according to your role structure
                ))}
              </Select>
