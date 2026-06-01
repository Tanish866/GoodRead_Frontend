import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "Redux/Slices/AuthSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigator = useNavigate();


  const [signupDetails, setSignupDetails] = useState({
      email: "",
      password: "",
      username: ""
  });

  async function onFormSubmit(e){
      e.preventDefault();
      const response = await dispatch(signup(signupDetails));
      console.log(response);
      if(response?.payload){
        navigator("/Login");
      }
      resetForm();
  }

  function resetForm(){
      setSignupDetails({
        email: "",
        password: "",
        username: ""
      });
    }

  function handelFormChange(e){
      const {name, value} = e.target;
      setSignupDetails({
          ...signupDetails,
          [name]: value
      });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#181b24] px-4">
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/20 blur-[120px]" />

      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Create Account
        </h1>

        <div className="mt-5 flex items-center justify-center gap-4">
          <p className="text-xl text-white/70">
            Already have an account?
          </p>

          <button className="rounded-full cursor-pointer bg-emerald-400 px-5 py-2 text-xl font-bold text-[#181b24] transition hover:bg-emerald-300">
            <Link to="/Login">Login</Link>
          </button>
        </div>

        <form onSubmit={onFormSubmit} className="mt-10 space-y-5" autoComplete="off">
          <input
            autoComplete="off"
            type="text"
            placeholder="Username"
            name="username"
            value={signupDetails.username}
            onChange={handelFormChange}
            className="w-full rounded-xl border border-white/10 bg-[#2d3548] px-6 py-4 text-lg font-medium text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-400"
          />

          <input
            autoComplete="off"
            type="email"
            placeholder="Email"
            name="email"
            value={signupDetails.email}
            onChange={handelFormChange}
            className="w-full rounded-xl border border-white/10 bg-[#2d3548] px-6 py-4 text-lg font-medium text-white outline-none placeholder:text-white/60 focus:ring-2 focus:ring-emerald-400"
          />

          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handelFormChange}
            value={signupDetails.password}
            className="w-full rounded-xl border border-white/10 bg-[#2d3548] px-6 py-4 text-lg font-medium text-white outline-none placeholder:text-white/60 focus:ring-2 focus:ring-emerald-400"
          />

          <button className="w-full rounded-xl cursor-pointer bg-gradient-to-r from-emerald-300 to-teal-400 py-4 text-lg font-bold text-[#181b24] shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01]">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}