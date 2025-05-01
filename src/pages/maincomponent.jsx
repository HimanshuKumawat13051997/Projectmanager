import { ContentLayout } from "../Layout/contentLayout";
import { NavBar } from "../Components/navBar";
import { useSelector } from "react-redux";
import { Loading } from "../Components/loading";

export function MainComp() {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <Loading />;
  }
  return (
    <>
      <NavBar />
      <ContentLayout />
    </>
  );
}
