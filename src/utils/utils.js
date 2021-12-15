import axios from "axios";

export const getHeaderConfig = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  };
  return config;
};

export const getUser = async (token) => {
  const { data } = await axios.get(`${process.env.SERVER_URL}/users/me`, getHeaderConfig(token));
  return data;
};

// Date to ISO string converter
export const stringifyDate = (date) => {
  return date.toISOString();
};

// ISO string to Date converter
export const dateFromString = (date) => {
  return new Date(date);
};