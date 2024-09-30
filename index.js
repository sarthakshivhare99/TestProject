const getColor = () => {
    if (userValidationMessage === "User ID is valid") {
      return "green"; // Valid message
    } else if (userValidationMessage === "User ID cannot be empty" || userValidationMessage === "User ID is invalid") {
      return "red"; // Invalid or empty message
    }
    return "inherit"; // Default color
  };
