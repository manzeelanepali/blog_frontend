import axios from "axios";
const baseUrl = "/api/blogs";
//  first of all token is null
let token = null;

// and then we will use set token
const setToken = (newToken) => {
  token = `barear ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response.data;
};
//  changed it for the suthorizantion header
const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

export default { getAll, create, setToken };
