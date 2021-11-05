let user = localStorage.getItem("user");
user = JSON.parse(user);
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.headers.common = { Authorization: `bearer ${user.token}` };
export default axios;
