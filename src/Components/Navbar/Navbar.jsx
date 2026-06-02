import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "Redux/Slices/AuthSlice";
import { clearShelf } from "Redux/Slices/ShelfSlice";

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
    dispatch(clearShelf());
  }

  return (
    <div className="navbar min-h-20 bg-[#1f2433] px-4 shadow-md sm:px-6 lg:px-10">
      <div className="flex-1">
        <Link
          to="/dashboard"
          className="rounded-lg bg-[#181b24] px-3 py-2 text-lg font-bold text-white sm:px-4 sm:py-3 sm:text-2xl"
        >
          📚 BookShelf
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {authState.isLoggedin && (
          <Link
            to="/Shelf"
            className="text-base text-white/80 transition hover:text-white sm:text-xl"
          >
            Shelfs
          </Link>
        )}

        {authState.isLoggedin ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/5 sm:gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-base font-bold text-[#181b24] sm:h-10 sm:w-10 sm:text-lg">
                {userInitial}
              </div>

              <span className="hidden text-lg text-white sm:block">
                {username}
              </span>

              <span className="text-xs text-white/70 sm:text-sm">
                ▼
              </span>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu mt-3 w-40 rounded-box bg-base-200 p-2 shadow-lg"
            >
              <li>
                <Link onClick={onLogout} to="/login" className="text-lg">
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
              className="cursor-pointer text-base text-white/80 transition hover:text-white sm:text-xl"
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