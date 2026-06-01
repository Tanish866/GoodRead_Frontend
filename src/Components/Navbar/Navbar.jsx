import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "Redux/Slices/AuthSlice";

export default function Navbar() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const username =
    authState?.user?.username ||
    authState?.data?.username ||
    "User";

  const userInitial = username.charAt(0).toUpperCase();

  function onLogout() {
    dispatch(logout());
  }

  return (
    <div className="navbar h-25 bg-[#1f2433] px-10 shadow-md">
      <div className="flex-1">
        <Link
          to="/dashboard"
          className="rounded-lg bg-[#181b24] px-4 py-3 text-2xl font-bold text-white"
        >
          📚 BookShelf
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {authState.isLoggedin && (
          <Link
            to="/shelves"
            className="text-xl text-white/80 transition hover:text-white"
          >
            Shelves
          </Link>
        )}

        {authState.isLoggedin ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-lg font-bold text-[#181b24]">
                {userInitial}
              </div>

              {/* <span className="text-xl text-white">
                {username}
              </span> */}

              {/* <span className="text-sm text-white/70">
                ▼
              </span> */}
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu mt-3 w-40 rounded-box bg-base-200 p-2 shadow-lg"
            >
              <li>
                <Link
                  onClick={onLogout}
                  to="/login"
                  className="text-lg"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="cursor-pointer text-xl text-white/80 transition hover:text-white"
            >
              Options
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu mt-3 w-40 rounded-box bg-base-200 p-2 shadow-lg"
            >
              <li>
                <Link to="/signup" className="text-lg">
                  Signup
                </Link>
              </li>

              <li>
                <Link to="/login" className="text-lg">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}