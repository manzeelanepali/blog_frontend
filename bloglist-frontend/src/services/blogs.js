import axios from "axios";
const baseUrl = "/api/blogs";
//  first of all token is null
let token = null;

// and then we will use set token
const setToken = (newToken) => {
  token = ` bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
//  changed it for the suthorizantion header
const create = async (newObject) => {
  // console.log("the created newobj", newObject);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
export default { getAll, create, setToken, update, remove };
