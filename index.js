 {userValidationMessage && (
            <Typography variant="body2" color={userValidationMessage.includes("valid") ? "green" : "red"}>
              {userValidationMessage}
