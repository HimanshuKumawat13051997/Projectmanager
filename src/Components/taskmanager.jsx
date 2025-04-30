import axios from "axios";
import React, { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { backendURL } from "../reduxuse/extrafeature/authActions";
import { getTasks } from "../reduxuse/slices/taskSlice";
import {
  requestforAddtask,
  requestforDeleteTask,
  requestforEditTask,
} from "../reduxuse/extrafeature/requestfortask";

export const ProjectDetails = () => {
  const { task } = useSelector((state) => state.task);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const getAllTasks = async (id) => {
    const data = await axios.get(`${backendURL}/task/alltask/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(getTasks(data.data.data));
  };

  useEffect(() => {
    getAllTasks(id);
  }, [dispatch]);

  const onsubmit = async (data) => {
    await requestforAddtask(data, id);
    getAllTasks(id);
    reset();
  };

  const handleDelete = async (id, _id) => {
    await requestforDeleteTask(id, _id);
    getAllTasks(id);
  };

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskFields, setEditTaskFields] = useState({
    title: "",
    description: "",
    status: "pending",
  });



  const startEditing = (task) => {
    setEditTaskId(task._id);
    setEditTaskFields({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const saveEdit = async () => {
    if (!editTaskFields.title.trim() || !editTaskFields.description.trim())
      return;
    const data = {...editTaskFields, _id: editTaskId}
    await requestforEditTask(id, data);
    await getAllTasks(id); // refresh list
    setEditTaskId(null);
    setEditTaskFields({
      title: "",
      description: "",
      status: "Pending",
    });
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskFields({
      title: "",
      description: "",
      status: "pending",
      _id: "",
    });
  };

  return (
    <div className="col-span-12 row-span-12 flex justify-center items-start p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Project #{id} - Tasks
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline"
          >
            ⬅ Back
          </button>
        </div>

        {/* Add Task */}
        <form className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            {...register("title", {
              required: {
                value: true,
                message: `Title is required`,
              },
            })}
            placeholder="Enter a title"
            className="px-2 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            {...register("description", {
              required: {
                value: true,
                message: `Description is required`,
              },
            })}
            placeholder="Enter a description"
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            {...register("status", {
              required: true,
            })}
            placeholder="Enter a task"
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={handleSubmit(onsubmit)}
            className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        {task.length === 0 ? (
          <p className="text-gray-500 text-center">
            No tasks yet. Add one above.
          </p>
        ) : (
          <ul className="space-y-4">
            {task.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm"
              >
                {editTaskId === task._id ? (
                  <div className="flex-1 flex flex-wrap gap-3 items-center">
                    <input
                      value={editTaskFields.title}
                      onChange={(e) =>
                        setEditTaskFields({
                          ...editTaskFields,
                          title: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Title"
                    />
                    <input
                      value={editTaskFields.description}
                      onChange={(e) =>
                        setEditTaskFields({
                          ...editTaskFields,
                          description: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Description"
                    />
                    <select
                      value={editTaskFields.status}
                      onChange={(e) =>
                        setEditTaskFields({
                          ...editTaskFields,
                          status: e.target.value,
                        })
                      }
                      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button
                      onClick={saveEdit}
                      className="text-green-600 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-gray-800 text-[12px] text-base flex-1">
                      {task.title}
                    </span>
                    <span className="text-gray-800 text-[12px] text-base flex-1">
                      {task.description}
                    </span>
                    <span className="text-gray-800 text-[12px] text-base flex-1">
                      {task.status}
                    </span>
                    <div className="space-x-4 text-sm">
                      <button
                        onClick={() => startEditing(task)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id, task._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
