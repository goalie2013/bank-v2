import axios from "axios";

class ApiService {
  static async getProtectedRoute(token) {
    try {
      return await axios.get("http://localhost:5050/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      return error;
    }
  }

  static hey() {
    console.log("hey there this is a STATIC METHOD");
  }

  static registerUser(formData) {
    return axios.post("http://localhost:5050/auth/register", formData);
  }

  loginUser(formData) {
    return axios.post("http://localhost:5050/auth/login", formData);
  }
}

export default ApiService;
