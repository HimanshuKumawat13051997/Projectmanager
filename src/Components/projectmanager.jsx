import  { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {  getProjects } from "../reduxuse/slices/projectSlice";
import axios from "axios";
import { backendURL } from "../reduxuse/extrafeature/authActions";
import { requestforAddproject, requestforDeleteProject } from "../reduxuse/extrafeature/requestforprojects";

export const ProjectManager = () => {
  const {projects} = useSelector((state)=>state.project)
  const {register, reset, handleSubmit} = useForm()
  const dispatch = useDispatch()

  const getAllProjects = async() => {
    const data = await axios.get(`${backendURL}/project/getallproject`,{
      headers : {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    dispatch(getProjects(data.data.data))
  }
  useEffect(()=>{
    
    getAllProjects()
  },[dispatch])

  
  const onSubmit = async (data) => {
    await requestforAddproject(data)
    getAllProjects()
    reset()
    };

  const handleDelete =  async (e,id) => {
    e.stopPropagation();
    await requestforDeleteProject(id)
    getAllProjects()
  }

  const navigate = useNavigate();

  

  return (
    <div className="col-span-12 row-span-12 flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Project Dashboard
        </h1>

        <form className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter project name"
            {...register("projectname", {
              required: {
                value: true,
                message: `Project Name is required`,
              },
            })}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-blue-600 text-black px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={projects.length >= 4}
          >
            Add
          </button>
        </form>

        {projects.length === 0 ? (
          <p className="text-gray-500 text-center">No projects yet. Add one above.</p>
        ) : (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project._id}
                onClick={() => navigate(`/loggedin/${project._id}`)}
                className="flex justify-between items-center px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <span className="text-lg text-gray-800">{project.projectname}</span>
                <button
                  onClick={(e) => handleDelete(e,project._id)}
                  className="text-red-600 font-medium hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


