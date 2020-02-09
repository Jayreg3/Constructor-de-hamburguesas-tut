import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-hamburguesa-tut.firebaseio.com/"
});

export default instance;
