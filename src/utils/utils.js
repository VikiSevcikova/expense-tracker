import axios from "axios";

export const getUser =  async (token) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      };
      const userData = await axios.get("/users/me", config);
      return userData;
}

// export const logoutUser = () => {
//     const { data } = await axios.get("/auth/logout");
//     return data;
// }

// export const loginUser = () => {
//     const { data } = await axios.get("/auth/login");
//     return data;
// }

// export const registerUser = () => {
//     const { data } = await axios.get("/auth/register");
//     return data;
// }