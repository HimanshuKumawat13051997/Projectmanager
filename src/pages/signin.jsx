import { BiHide, BiShowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, userLogin } from "../reduxuse/extrafeature/authActions";
import { useNavigate } from "react-router";

export function SignIn({ showSignIn }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [showpassowrd, Setshowpassword] = useState(false);
  const { success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/loggedin");
    }
  }, [userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(userLogin(data));
    if (success) {
      navigate("/loggedin");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-span-12 row-span-12 col-start-1 row-start-1 sm:col-span-8 sm:row-span-10 sm:row-start-2 sm:col-start-3 md:col-span-6 md:row-span-10 md:row-start-2 md:col-start-4 lg:col-span-4 lg:row-span-10 lg:row-start-2 lg:col-start-5 sm:h-full sm:rounded-2xl shadow-2xl bg-white flex flex-col p-8 sm:px-15 md:px-15 lg:px-12 items-center"
    >
      <span className="font-extrabold mb-4">Welcome Back!</span>
      <p className="text-gray-500 mb-10">
        We missed you! Please enter your details.
      </p>
      <div className="flex flex-col gap-2 w-full justify-between mb-4">
        <span className="font-extrabold">Email</span>
        <input
          className="border-2 border-gray-400 rounded-lg p-2 w-full outline-none"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is Required",
            },
          })}
        />
        {errors.email && (
          <span className="text-[12px] text-red-600 font-bold">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full justify-between ">
        <span className="font-extrabold">Password</span>
        <div className="border-2 border-gray-400 rounded-lg p-2 h-full w-full flex items-center justify-between">
          <input
            className="w-full h-full outline-none bg-transparent"
            type={`${showpassowrd ? "text" : "password"}`}
            name="password"
            placeholder="Enter Password"
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message: "Password must meet the criteria",
              },
              required: {
                value: true,
                message: "Password is Required",
              },
            })}
          />
          <span
            onClick={() => {
              Setshowpassword((prev) => !prev);
            }}
          >
            {showpassowrd ? <BiHide /> : <BiShowAlt />}
          </span>
        </div>
        {errors.password && (
          <span className=" text-[12px] text-red-600 font-bold">
            {errors.password.message}
          </span>
        )}
      </div>
      <input
        type="submit"
        value={"Sign In"}
        className="border-2 mt-10 text-white w-full flex items-center justify-center mb-5 rounded-lg h-10 font-bold bg-blue-700"
      />
      <div className=" w-full flex items-center justify-center">
        Don't have an account?{" "}
        <span
          className="text-blue-700
            "
          onClick={() => showSignIn()}
        >
          Sign up
        </span>
      </div>
    </form>
  );
}
