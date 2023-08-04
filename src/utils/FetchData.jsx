//fonction de recuperation data
//import env from "react-dotenv";
import axios from "axios";
export const FetchData = async (type, date) => {
  //const baseApi = env.API_URL;

  //const url = `${baseApi}/${type}/${date}`;
  const url = `${type}/${date}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
