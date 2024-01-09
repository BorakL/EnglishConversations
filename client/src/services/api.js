import axios from "axios";

axios.defaults.baseURL = proces.env.CYCLIC_URL

const token = localStorage.getItem("token");
const headers = {
    'Content-Type': 'application/json',
    'withCredentials': true
}
if(token){
    headers['Authorization'] = `Bearer ${token}`
}

export const getTopic = (id) => axios.get(`topics/${id}`)
export const getTopics = (params) => axios.get("topics",{params})
export const getTopicConversations = (id, query) => axios.get(`topics/${id}/conversations`, {params: query} )
export const getConversation = (id) => axios.get(`conversations/${id}`)
export const updateConversation = (id,newConversation) => axios.put(`conversations/${id}`,newConversation, {headers} )
export const loginUser = (data) => axios.post("users/login",data,{headers})
export const signupUser = (data) => axios.post("users/signup",data,{headers})
export const createConversation = (data) => axios.post('conversations',data,{headers})