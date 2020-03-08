import axios from "axios";

export const search_api = search => {
  return axios.get(`http://localhost:5000/search/${search}/1`)
};