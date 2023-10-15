import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import logoGoogle from "../assets/image/logoGoogle.png";

const GoogleLogin = () => {
  const registerWithGoogle = async (accessToken) => {
    try {
      const response = await axios.post(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        {
          access_token: accessToken,
        }
      );
      const { data } = response.data;
      const { token } = data;

      localStorage.setItem("token", token);
      // go to home page
      window.location.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data?.message);
        return;
      }
      console.log(error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerWithGoogle(responseGoogle.access_token),
  });
  return (
    <div
      className="cursor-pointer w-8/12 my-2 box-border flex justify-center hover:translate-y-[-5px] duration-300 border rounded-lg border-slate-5500"
      onClick={() => loginWithGoogle()}
    >
      <div className="">
        <img width={40} height={40} src={logoGoogle} alt="" />
      </div>
      <div className="text-white my-auto font-semibold text-lg">
        <span>Login with Google</span>
      </div>
    </div>
  );
};

export default GoogleLogin;
