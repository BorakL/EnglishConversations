import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:3001/api/v1/"

export const getTopics = axios.get("http://127.0.0.1:3001/api/v1/topics")