import "./App.css";
import { Route, Routes } from "react-router";

import { SigningLayout } from "./Layout/signingLayout";
import { ProjectManager } from "./Components/projectmanager";
import { ProjectDetails } from "./Components/taskmanager";

import { ProtectedRoute } from "./Components/protectedroute";

export function App() {
  // const { userInfo } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(currentUser());
  // }, []);

  return (
    <div className="box-content grid grid-cols-2 grid-rows-12 gap-1 h-screen w-screen">
      <Routes>
        {/* <Route
          index
          element={!userInfo ? <SigningLayout /> : <Navigate to="/loggedin" />}
        /> */}
        <Route index element={<SigningLayout />} />
        <Route path="/loggedin" element={<ProtectedRoute />}>
          <Route index element={<ProjectManager />} />
          <Route path=":id" element={<ProjectDetails />} />
        </Route>
      </Routes>
    </div>
  );
}
