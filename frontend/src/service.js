import axios from "axios";

class ApiService {
  async getProtectedRoute(token) {
    // Fetch toys from API
    const response = await axios.get("http://localhost:5050/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  }

  registerUser(formData) {
    axios.post("http://localhost:5050/auth/register", formData);
  }

  loginUser(formData) {
    axios.post("http://localhost:5050/auth/login", formData);
  }
}

export default ApiService;
