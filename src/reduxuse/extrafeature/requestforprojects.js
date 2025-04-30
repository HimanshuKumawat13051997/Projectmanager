import axios from "axios"
import { backendURL } from "./authActions"

  export const requestforAddproject = async(data) => {
    const projects = await axios.post(`${backendURL}/project/addproject`, data, {
      headers : {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    return projects.data.data
  }

  export const requestforDeleteProject = async(id) => {
    const projects = await axios.post(`${backendURL}/project/deleteproject`, {
        projectid: id
    }, {
        headers : {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      return projects.data.data
  }