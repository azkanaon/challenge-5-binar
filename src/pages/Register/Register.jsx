import { useState } from "react";
import bg from "../../assets/image/bg-login.jpg";
import axios from "axios";
import backLogo from "../../assets/image/backLogo.png";
import { Link } from "react-router-dom";
function Register() {
  const [email, setEmail] = useState("");
  const [lName, setLName] = useState("");
  const [fName, setFName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState();

  const confirmPass = (event) => {
    event.preventDefault();
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
    if (password != confirmPassword) {
      setErrors("confirm password should be match with password");
    } else {
      setErrors("");
    }
  };

  const register = async (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      setErrors("confirm password should be match with password");
      alert(errors);
    } else {
      try {
        const fullname = `${fName} ${lName}`;
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_API_ADDRESS}/auth/register`,
          {
            email: email,
            name: fullname,
            password: password,
          }
        );
        const { data } = response.data;
        const { token } = data;
        console.log(token);
        window.location.replace("/login");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data?.message);
          return;
        }

        alert(error?.message);
      }
    }
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" h-screen w-screen flex justify-center items-center overflow-hidden"
    >
      <div className="animate-fade w-10/12 sm:w-8/12 md:w-6/12 lg:w-6/12 h-6/6 md:h-[90vh] backdrop-blur shadow-sm neon-slate rounded-xl flex flex-col justify-center items-center">
        <Link
          to="/login"
          className="font-semibold text-white text-1xl"
          style={{
            display: `flex`,
            justifyContent: `right`,
            width: `65%`,
            marginTop: `2vh`,
          }}
        >
          <img
            style={{
              width: `30px`,
              backgroundColor: `rgba(255, 255, 0, 0.778)`,
              borderRadius: `50%`,
            }}
            src={backLogo}
            alt=""
          />
        </Link>
        <div>
          <h1 className="text-center font-semibold text-white text-2xl">
            Register
          </h1>
        </div>
        <div className="w-full">
          <form onSubmit={register} className="flex flex-col  items-center">
            <div className="flex flex-col w-8/12 text-white">
              <label className="font-semibold mb-2" htmlFor="#id">
                First Name
              </label>
              <input
                className="border-2 py-1 px-2 rounded-md text-black"
                type="name"
                placeholder="Enter First Name"
                value={fName}
                onChange={(event) => setFName(event.target.value)}
              />
              <label className="font-semibold mb-2" htmlFor="#id">
                Last Name
              </label>
              <input
                className="border-2 py-1 px-2 rounded-md text-black"
                type="name"
                placeholder="Enter Last Name"
                value={lName}
                onChange={(event) => setLName(event.target.value)}
              />
              <label className="font-semibold mb-2" htmlFor="#id">
                Email
              </label>
              <input
                className="border-2 py-1 px-2 rounded-md text-black"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
              />
              <label className="font-semibold my-2" htmlFor="#id">
                Password
              </label>
              <input
                placeholder="Password"
                id="password"
                type="password"
                className="border-2 py-1 px-2 rounded-md text-black"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {password && (
                <>
                  <label className="font-semibold my-2" htmlFor="#id">
                    Confirm Password
                  </label>
                  <input
                    placeholder="Confirm Password"
                    id="password"
                    type="password"
                    className="border-2 py-1 px-2 rounded-md text-black"
                    value={confirmPassword}
                    onChange={(event) => confirmPass(event)}
                  />
                </>
              )}
              {confirmPassword && <label className="mb-3 my-2">{errors}</label>}
            </div>
            <button
              type="submit"
              className="mt-5 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 w-8/12 h-8 rounded-xl font-semibold text-white hover:bg-violet-900 hover:translate-y-[-3px]  duration-300"
            >
              {" "}
              Register{" "}
            </button>
          </form>
          <div className="mx-auto w-8/12 flex justify-center mt-6 "></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
