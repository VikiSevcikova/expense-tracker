import axios from "axios";

export const getUser =  async (token) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      };
      const { data } = await axios.get("/users/me", config);
      return data;
}

// export const loginUser = async (formData) => {
//     const { data } = await axios.post("/auth/login", formData);
//     return data;
// }

// export const logout = async () => {
//     const { data } = await axios.get("/auth/logout");
// }

// export const registerUser = async (formData) => {
//     const { data } = await axios.post("/auth/register", formData);
//     return data;
// }