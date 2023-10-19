import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [result, setResult] = useState("");
  const [user, setUser] = useState(null);
  // inputan dibawa ke search page
  const goToResultSearch = (e) => {
    e.preventDefault();
    navigate(`/movie/search/${result}`);
    setResult("");
  };

  // ketika scroll kebawah, maka perubahan warna akan terjadi
  const changeBackgroundColor = () => {
    window.scrollY > 10 ? setChangeColor(true) : setChangeColor(false);
  };

  // proses perubahan warna
  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener("scroll", changeBackgroundColor);
  }, []);

  const logout = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");

    // Redirect to home or reload the home
    // This is temporary solution, the better solution is using redux
    window.location.replace("/login");
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${import.meta.env.VITE_REACT_API_ADDRESS}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { data } = response.data;

        // Set the user state from API data
        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If token is not valid
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            return;
          }

          alert(error?.response?.data?.message);
          return;
        }

        alert(error?.message);
      }
    };

    getMe();
  }, []);

  return (
    <div
      className={`z-[30] shadow-md  fixed  w-full top-0 left-0 transition-all duration-300 ease ${
        changeColor ? "navbar-scroll neon-zinc" : ""
      }`}
    >
      <div className="md:flex py-1 bg-transparent md:py-2 md:px-10 px-7 justify-between items-center">
        <NavLink
          to="/"
          className="w-6/12 md:w-auto  px-2 md:px-8 rounded-md font-semibold text-2xl cursor-pointer flex items-center text-gray-800 font-poppins"
        >
          <span className="shadow-text text-6xl text-white mr-1 pt-2">M</span>
          <p className="hidden md:block shadow-text text-white">ovieList</p>
        </NavLink>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={` md:hidden text-4xl text-white absolute ${
            changeColor ? "top-9" : "top-6"
          } right-9  cursor-pointer duration-300`}
        >
          <ion-icon name={open ? "close-outline" : "menu-outline"}></ion-icon>
        </div>
        <div
          className={`rounded-b-xl md:rounded-none md:flex md:items-center md:justify-between md:pb-0 absolute md:static px-8 ${
            changeColor
              ? "navbar-scroll shadow-md neon-zinc md:shadow-none"
              : "bg-transparent"
          } md:z-30 z-[-1] left-0 w-full md:w-8/12 md:pl-0 transition-all duration-300 ease ${
            open ? "top-20 opacity-100 backdrop-blur-sm" : "top-[-490px]"
          } md:opacity-100 opacity-0`}
        >
          <div className=" my-7 md:my-0 md:mx-0 mx-7 md:w-[500px]">
            <form
              onSubmit={goToResultSearch}
              className="flex justify-center md:w-full"
              action=""
            >
              <div className=" relative flex items-center justify-end focus-within:text-gray-100 w-full ">
                <input
                  onChange={() => setResult(event.target.value)}
                  className="md:h-[40px] px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-3xl border-none ring-2 ring-gray-400 w-full outline-none focus:outline-1 focus:outline-black"
                  type="text"
                  aria-label="Search Movie"
                  placeholder="Search Movie"
                />
                <span className="absolute mr-4 text-2xl text-gray-400">
                  <ion-icon name="search-outline"></ion-icon>
                </span>
              </div>
            </form>
          </div>
          <div className="flex justify-center text-md my-7 md:my-0 md:mx-0 mx-7">
            {user ? (
              <div className="text-white">
                <NavLink className="mx-3 px-4" to="/profile">
                  <p className="shadow-text inline-block font-semibold hover:scale-105 hover:translate-y-[-2px] duration-300">
                    {user.name}
                  </p>
                </NavLink>
                <button
                  className="mx-3 px-4  hover:underline text-white hover:scale-105 hover:translate-y-[-2px] font-semibold tracking-widest duration-200 shadow-text"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button className="mx-3 shadow-text hover:scale-105 hover:translate-y-[-2px] text-white font-semibold tracking-widest py-2 px-4 rounded-2xl duration-200">
                  Login
                </button>
                <button className="mx-3 shadow-text text-white  font-semibold hover:text-white tracking-widest py-2 px-4 duration-200 hover:scale-105 hover:translate-y-[-2px]">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
