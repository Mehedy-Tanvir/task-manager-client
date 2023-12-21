import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully", { id: toastId });
      })
      .catch((error) => toast.error(error.message, { id: toastId }));
  };
  const links = (
    <>
      {!loading && user && (
        <li className="md:ml-0 text-[var(--body_color)] text-[16px]">
          <div className="flex flex-col items-start justify-center gap-2 lg:items-center lg:flex-row">
            <img
              className="h-[24px] w-[24px] object-cover object-center rounded-[50%] mr-2"
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
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "lg:text-yellow-500 drop-shadow-lg normal-case font-poppins font-normal text-[16px]"
              : "text-[#222] drop-shadow-lg normal-case font-normal text-[16px]"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "lg:text-yellow-500] drop-shadow-lg normal-case font-poppins font-normal text-[16px]"
              : "text-[#222] drop-shadow-lg normal-case font-normal text-[16px]"
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      </li>

      {!loading && !user && (
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " lg:bg-yellow-500 duration-1000 ease-in-out drop-shadow-lg hover:bg-opacity-80 lg:text-white lg:py-1 lg:px-4 rounded-md  normal-case font-normal text-[16px]"
                : " lg:bg-yellow-500 duration-1000 ease-in-out drop-shadow-lg hover:bg-opacity-80 lg:text-white lg:py-1 lg:px-4 rounded-md  normal-case font-normal text-[16px]"
            }
            to="/login"
          >
            Login
          </NavLink>
        </li>
      )}

      {!loading && user && (
        <li>
          <NavLink
            onClick={handleLogout}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " lg:bg-yellow-500 duration-1000 ease-in-out drop-shadow-lg hover:bg-opacity-80 lg:text-white lg:py-1 lg:px-4 rounded-md  normal-case font-normal text-[16px]"
                : " lg:bg-yellow-500 duration-1000 ease-in-out drop-shadow-lg hover:bg-opacity-80 lg:text-white lg:py-1 lg:px-4 rounded-md  normal-case font-normal text-[16px]"
            }
          >
            Logout
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="w-full">
      <div className="max-w-[1400px] bg-white font-poppins flex items-center justify-between px-2 py-4 mx-auto">
        <div className="flex items-center gap-[10px] justify-center drop-shadow-sm">
          <img className="h-[24px]" src="/logo.svg" alt="logo" />
          <p className="text-[24px] text-[#222] font-bold">
            TASK<span className="text-yellow-500">Y.</span>
          </p>
        </div>
        <ul className="lg:flex hidden items-center uppercase justify-between gap-[60px]">
          {links}
        </ul>
        <div className="z-50 dropdown dropdown-left lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <AiOutlineMenu className="text-[36px] text-[var(--body_color)]" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 uppercase"
          >
            {links}
            {!loading && user && (
              <li className="lg:hidden">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "lg:text-[#FA7436] drop-shadow-lg normal-case font-poppins font-normal text-[16px]"
                      : "text-[#222] drop-shadow-lg normal-case font-normal text-[16px]"
                  }
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
