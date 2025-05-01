import { ContentLayout } from "../Layout/contentLayout";
import { NavBar } from "../Components/navBar";
import { useSelector } from "react-redux";

export function MainComp() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <NavBar />
      <ContentLayout />
    </>
  );
}
