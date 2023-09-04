import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3001/api/v1/"

export const getTopics = (params) => axios.get("topics",{params})
export const getTopicConversations = (id, query) => axios.get(`topics/${id}/conversations`, {params: query} )
export const getConversation = (conversation) => axios.get(`conversations/${conversation}`)