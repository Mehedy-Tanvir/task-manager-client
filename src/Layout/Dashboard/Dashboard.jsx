import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { MdOutlineAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { user, loading, logoutUser } = useContext(AuthContext);
  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully", { id: toastId });
      })
      .catch((error) => toast.error(error.message, { id: toastId }));
  };
  return (
    <>
      <Helmet>
        <title>Tasky | Dashboard</title>
      </Helmet>
      <label
        htmlFor="my-drawer-2"
        className="mt-[10px] ml-4 bg-slate-300 btn drawer-button lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <div className="h-screen drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col items-center justify-center overflow-y-auto drawer-content">
          {/* Page content here */}
          <div className="mt-[200px] lg:mt-[100px]">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {!loading && user && (
              <li className="text-xl font-medium">
                <div className="flex flex-col items-center justify-center gap-2">
                  <img
                    className="h-[50px] w-[50px] object-cover object-center rounded-[50%] mr-2"
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://imagizer.imageshack.com/img923/6317/jRVw55.png"
                    }
                    alt=""
                  />
                  <p className="font-medium normal-case">{user?.displayName}</p>
                </div>
              </li>
            )}
            <hr className="border-2 border-black" />
            <li className="text-xl font-medium">
              <Link to="/dashboard/addTasks">
                <MdOutlineAddTask className="font-bold text-yellow-500" /> Add
                Tasks
              </Link>
            </li>
            <li className="text-xl font-medium">
              <Link to="/dashboard/tasksList">
                <FaTasks className="font-bold text-yellow-500" /> Tasks List
              </Link>
            </li>
            <hr className="border-2 border-black" />
            <li className="text-xl font-medium">
              <Link to="/">
                <FaHome className="font-bold text-yellow-500" /> Home
              </Link>
            </li>
            <li className="text-xl font-medium">
              <button onClick={handleLogout}>
                <LuLogOut className="font-bold text-yellow-500" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
