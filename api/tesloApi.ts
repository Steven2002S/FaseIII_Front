import axios from "axios";

const tesloApi = axios.create({
  baseURL: "localhost:3000/api",
});

export default tesloApi;
