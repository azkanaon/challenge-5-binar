import { useState } from "react";
import axios from "axios";
import GoogleLogin from "../../components/GoogleLogin";
import bg from "../../assets/image/bg-login.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      const { data } = response.data;
      const { token } = data;

      // save our token
      localStorage.setItem("token", token);

      // go to home page
      window.location.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data?.message);
        return;
      }

      alert(error?.message);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(${bg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className=" h-screen w-screen flex justify-center items-center"
      >
        <div className="animate-fade w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 h-4/6 md:h-[60%] backdrop-blur shadow-sm neon-slate rounded-xl flex flex-col justify-center items-center">
          <div>
            <h1 className="text-center font-semibold text-white text-2xl">
              Login
            </h1>
          </div>
          <div className="w-full">
            <form onSubmit={login} className="flex flex-col  items-center">
              <div className="flex flex-col w-8/12 text-white">
                <label className="font-semibold mb-2" htmlFor="#id">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="border-2 py-1 px-2 rounded-md text-black"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label className="font-semibold my-2" htmlFor="#id">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="border-2 py-1 px-2 rounded-md text-black"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-5 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 w-8/12 h-8 rounded-xl font-semibold text-white hover:bg-violet-900 hover:translate-y-[-3px]  duration-300"
              >
                {" "}
                Login{" "}
              </button>
            </form>
            <div className="mx-auto w-8/12 flex justify-center mt-6 ">
              <div className="w-5/12">
                <hr className="w-full my-3 h-[2px] bg-gray-400 border-0" />
              </div>
              <h1 className="mx-2 text-gray-400">OR</h1>
              <div className="w-5/12">
                <hr className="w-full my-3 h-[2px] bg-gray-400 border-0" />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <GoogleLogin />
            </div>
            <div className="w-8/12 flex mx-auto justify-center mt-3">
              <p className="text-white/70">
                Don&apos;t have an account ?{" "}
                <span className="underline">
                  <Link
                    to="/register"
                    className="text-white/90 hover:font-semibold hover:translate-y-[-3px] inline-block duration-300"
                  >
                    Register
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
