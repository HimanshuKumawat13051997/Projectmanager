import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { SigningLayout } from "./Layout/signingLayout";
import { ProjectManager } from "./Components/projectmanager";
import { ProjectDetails } from "./Components/taskmanager";

import { MainComp } from "./pages/maincomponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { currentUser } from "./reduxuse/extrafeature/authActions";
import { Loading } from "./Components/loading";
import { NavBar } from "./Components/navBar";

export function App() {
  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUser());
  }, []);

  if (loading && !error) {
    return <Loading />;
  }

  return (
    <div className="box-content grid grid-cols-2 grid-rows-12 gap-1 h-screen w-screen">
      <Routes>
        <Route
          index
          element={!userInfo ? <SigningLayout /> : <Navigate to="/loggedin" />}
        />
        {/* <Route index element={<SigningLayout />} /> */}

        <Route
          path="/loggedin"
          element={userInfo ? <MainComp /> : <Navigate to="/" />}
        >
          <Route
            path="/loggedin"
            element={userInfo ? <ProjectManager /> : <Navigate to="/" />}
          />
          <Route path="/loggedin/:id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </div>
  );
}
