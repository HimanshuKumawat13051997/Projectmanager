import { BiHide, BiShowAlt } from "react-icons/bi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../reduxuse/extrafeature/authActions";

export function SignUp({ showSignIn, notify }) {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    notify();
    showSignIn();
  };

  const fields = [
    {
      label: "Email",
      type: "email",
      placeholder: "Enter Email Address",
      name: "email",
    },
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter Your Name",
    },
    {
      label: "Country",
      type: "text",
      name: "country",
      placeholder: "Enter Your Country Name",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-span-12 row-span-12 col-start-1 row-start-1 sm:col-span-8 sm:row-span-10 sm:row-start-2 sm:col-start-3 md:col-span-6 md:row-span-10 md:row-start-2 md:col-start-4 lg:col-span-4 lg:row-span-10 lg:row-start-2 lg:col-start-5 sm:rounded-2xl shadow-2xl bg-white flex flex-col p-4 sm:p-7 items-center"
    >
      <span className="font-extrabold mb-1">Create an Account!</span>
      <p className="text-gray-500 mb-1 text-center">
        Join us by filling in your details below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 w-full mb-1">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col gap-2">
            <span className="font-extrabold">{field.label}</span>
            <input
              className="border-2 border-gray-400 rounded-lg p-2 w-full outline-none"
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name, {
                required: {
                  value: true,
                  message: `${field.label} is required`,
                },
              })}
            />
            {errors[field.name] && (
              <span className="text-[12px] text-red-600 font-bold">
                {errors[field.name].message}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full justify-between mb-1">
        <span className="font-extrabold">Password</span>
        <div className="border-2 border-gray-400 rounded-lg p-2 h-full w-full flex items-center justify-between">
          <input
            className="w-full h-full outline-none bg-transparent"
            type={showPassword ? "text" : "password"}
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
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <BiHide /> : <BiShowAlt />}
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
        value={"Sign Up"}
        className="border-2 text-white w-full flex items-center justify-center  rounded-lg h-10 font-bold bg-blue-700 cursor-pointer "
      />

      <div className="w-full flex items-center justify-center">
        Already have an account?{" "}
        <span
          className="text-blue-700 font-bold cursor-pointer"
          onClick={showSignIn}
        >
          Sign In
        </span>
      </div>
    </form>
  );
}
