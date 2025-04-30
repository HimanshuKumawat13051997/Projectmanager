import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { SignIn } from "../pages/signin";
import { SignUp } from "../pages/signup";

export function SigningLayout() {
  const notify = () => toast("Registration Completed");

  const [showSignIn, SetShowSignIn] = useState(true);

  const Signpagechange = () => {
    SetShowSignIn(!showSignIn);
  };

  return (
    <div className="col-span-2 row-span-12 grid grid-cols-12 grid-rows-12 gap-4 h-full bg-gradient-to-br from-[#4e54c8] via-[#8f94fb] to-[#34e89e]">
      <ToastContainer />
      {showSignIn ? (
        <SignIn showSignIn={Signpagechange} />
      ) : (
        <SignUp showSignIn={Signpagechange} notify={notify} />
      )}
    </div>
  );
}
