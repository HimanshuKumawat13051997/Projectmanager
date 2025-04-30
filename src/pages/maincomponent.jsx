import { ContentLayout } from "../Layout/contentLayout";
import { NavBar } from "../Components/navBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Suspense, useEffect } from "react";
import { Loading } from "../Components/loading";
import { currentUser } from "../reduxuse/extrafeature/authActions";

export function MainComp() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentUser());
  }, []);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <Suspense fallback={<Loading />}>
      <NavBar />
      <ContentLayout />
    </Suspense>
  );
}
