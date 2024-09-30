const handleValidateUser = async (userId) => {
    setIsValidating(true);
    try {
      const response = await axios.post("http://localhost:3001/ValUserDtls", { userId });
      setIsUserValid(response.data.isValid);
      if (response.data.isValid) {
        toast.success(`User ${userId} is valid`);
        // Auto-populate username and email
        setNewData(prevData => ({
          ...prevData,
          username: response.data.username,
          email: response.data.email
        }));
      } else {
        toast.error(`User ${userId} is not valid`);
      }
    } catch (error) {
      console.error("Error validating user:", error);
      toast.error(`Error validating user: ${error.message}`);
      setIsUserValid(false);
    } finally {
      setIsValidating(false);
    }
  };
