import { Outlet } from "react-router";

export function ContentLayout() {
  return (
    <div className="box-border h-full col-span-2 row-span-12 row-start-2 grid grid-cols-12 grid-rows-12 gap-1">
    <Outlet/>
    </div>
  );
}
