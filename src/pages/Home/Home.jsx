import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import SliderWithTitle from "../../components/SliderWithTitle";
import Footer from "../../components/Footer";

const Home = () => {
  const [moviePopularList, setMoviePopularList] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  // ambil movie dengan tipe popular
  useEffect(() => {
    const getPopularMovies = async () => {
      try {
         const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_BASEURL}/api/v1/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;
        console.log(data);
        if (data.length > 0) {
          const first9Movies = data.slice(0, 9);
          setMoviePopularList([...first9Movies]);
        }
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.message || error?.message,
          });
          return;
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getPopularMovies();
  }, []);
  return (
    <div className="bg-gradient-to-b from-black/100 to-black/50 font-poppins">
      <Navbar />
      <div className="pb-10">
        <Hero />
        {/* masing-masing tipe dirender di SliderWithTitle */}
        <SliderWithTitle
          title="Popular"
          type="popular"
          movieList={moviePopularList}
        />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
