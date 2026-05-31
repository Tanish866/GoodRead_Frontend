import logo from "Assets/Images/logo.webp";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#20212b] px-6 py-10 text-white">
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="BookShelf logo"
            className="h-40 w-40 rounded-full object-cover"
          />
        </div>

        <div className="mt-10 flex justify-center gap-4 md:absolute md:right-10 md:top-72 md:mt-0">
          <button className="rounded-md bg-purple-700 px-8 py-3 cursor-pointer text-lg font-bold uppercase text-white transition hover:bg-purple-800">
            <Link to="/Signup">Register</Link>
          </button>

          <button className="rounded-md bg-yellow-400 px-8 py-3 cursor-pointer text-lg font-bold uppercase text-black transition hover:bg-yellow-500">
            <Link to="/Login">Login</Link>
          </button>
        </div>

        <div className="mt-16 max-w-3xl text-center md:mt-28 md:text-left">
          <h1 className="text-5xl font-bold tracking-[0.18em] text-white md:text-6xl">
            BookShelf
          </h1>

          <p className="mt-8 text-4xl font-bold leading-relaxed tracking-[0.15em] text-yellow-400 md:text-5xl">
            Your personal library and social network for bookworms
          </p>
        </div>
      </div>
    </div>
  );
}