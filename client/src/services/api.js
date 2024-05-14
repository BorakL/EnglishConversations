import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/"
axios.defaults.baseURL = process.env.REACT_APP_ONRENDER_URL;


const getHeaders = ()=>{
    const token = localStorage.getItem("token");
    
    const headers = {
        'Content-Type': 'application/json',
        'withCredentials': true
    }
    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }
    return {headers}
}

export const getTopic = (id) => axios.get(`topics/${id}`)
export const getTopics = (params) => axios.get("topics",{params})
export const getTopicConversations = (id, query) => axios.get(`topics/${id}/conversations`, {params: query} )
export const getConversation = (id) => axios.get(`conversations/${id}`)
export const updateConversation = (id,newConversation) => axios.put(`conversations/${id}`,newConversation, getHeaders() )
export const loginUser = (data) => axios.post("users/login",data)
export const signupUser = (data) => axios.post("users/signup",data)
export const createConversation = (data) => axios.post('conversations',data,getHeaders())