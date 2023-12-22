import { Link } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const ErrorPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center mx-auto max-w-[1400px] pb-10 min-h-screen gap-6">
        <Helmet>
          <title>Tasky | Error</title>
        </Helmet>
        <div className="flex items-center justify-center">
          <img className="max-h-[400px]" src="/404-error.gif" alt="image" />
        </div>
        <h1 className="text-4xl font-bold text-center text-[#0B0B0BB3]">
          Error 404! Page not found!
        </h1>
        <Link to="/">
          <button className="bg-yellow-500 hover:opacity-90 text-white text-2xl font-semibold h-[60px] px-[20px] rounded-lg">
            Go Home
          </button>
        </Link>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ErrorPage;
