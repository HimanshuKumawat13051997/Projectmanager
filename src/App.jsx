
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { MainComp } from "./pages/maincomponent";
import { SigningLayout } from "./Layout/signingLayout";
import { ProjectManager } from "./Components/projectmanager";
import { ProjectDetails } from "./Components/taskmanager";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backendURL } from "./reduxuse/extrafeature/authActions";
import { useEffect } from "react";
import { userSet } from "./reduxuse/slices/authSlice";


export function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get(`${backendURL}/users/current-user`, {
          withCredentials: true,
        });
        dispatch(userSet(response.data.data));
      } catch (error) {
        console.log("Session expired or not found");
      }
    };
  
    checkUserSession();
  }, []);

  return (

    <div className="box-content grid grid-cols-2 grid-rows-12 gap-1 h-screen w-screen">
      <Routes>
        <Route path="/" element={<SigningLayout />} />
        <Route
          path="/loggedin"
          element={
            <ProtectedRoute>
              <MainComp />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProjectManager />} />
          <Route path=":id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

const ProtectedRoute = ({children}) => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? children: <Navigate to="/" replace />;
};

