import axios from "axios";

let user = localStorage.getItem("user");
axios.defaults.baseURL = "http://localhost:3000/api/";

if (!user) {
  user = {
    userId: null,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    axios.defaults.headers.common = { Authorization: `bearer ${user.token}` };
  } catch (ex) {
    user = {
      userId: null,
      token: "",
    };
  }
}
export default axios;
