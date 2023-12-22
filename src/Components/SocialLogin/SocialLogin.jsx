import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            console.log(res.data);
            if (location.state) {
              navigate(location.state);
            } else {
              navigate("/");
            }
            toast.success("User logged in successfully");
          })
          .catch((error) => {
            console.log(error);
            toast.error("User was not saved at the database");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("User logged in was not successful");
      });
  };
  return (
    <button
      type="button"
      className="h-[40px] mt-4 w-full text-center border-2 border-yellow-500 font-medium text-[#222] rounded-3xl"
      onClick={handleGoogleSignIn}
    >
      <div className="flex items-center justify-center gap-2">
        <img className="w-[16px] h-[16px]" src="/google.png" alt="" />
        <span>Sign In With Google</span>
      </div>
    </button>
  );
};

export default SocialLogin;
