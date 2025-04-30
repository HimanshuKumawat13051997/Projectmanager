import axios from "axios"
import { backendURL } from "./authActions"

  export const requestforAddtask = async(data, id) => {
    const task = await axios.post(`${backendURL}/task/addtask/${id}`, data, {
      headers : {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    return task.data.data
  }

  export const requestforDeleteTask = async(projectid, taskid) => {
    const task = await axios.post(`${backendURL}/task/deletetask/${projectid}`, {
        taskid: taskid
    }, {
        headers : {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      return task.data.data
  }

  export const requestforEditTask = async (projectId, updatedData) => {
    const res = await axios.put(
      `${backendURL}/task/updatetask/${projectId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  };