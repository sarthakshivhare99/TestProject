const fetchUserRoles = async () => {
    try {
      const response = await axios.post("http://localhost:3001/getUserRolesMdm", {});
      setRoles(response.data); // Assuming response.data is an array of roles
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };
