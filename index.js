 {/* Show Add button only if a vendor is selected in the Vehicle view */}
            {currentView === "vehicle" && selectedVendor && (
              <Button onClick={() => handleOpenModal()}>Add</Button>
            )}
            {/* Show Add button only if a plant is selected in the Section view */}
            {currentView === "section" && selectedPlant && (
              <Button onClick={() => handleOpenModal()}>Add</Button>
            )}
            {/* Always show Add button for other views */}
            {(currentView === "plant" || currentView === "loading" || currentView === "scrap" || currentView === "vendor") && (
              <Button onClick={() => handleOpenModal()}>Add</Button>
            )}
