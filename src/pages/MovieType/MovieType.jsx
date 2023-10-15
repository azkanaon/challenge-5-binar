import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MovieType = () => {
  const { type } = useParams();
  // tipe top rated direname agar tampilan terlihat lebih rapi
  const typeModifier = useState(type.toUpperCase());
  const [movieList, setMovieList] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  // ambil movie dengan tipe popular
  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_BASEURL}/movie/${type}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_REACT_TOKEN}`,
            },
          }
        );
        const { results } = response.data;
        if (results.length > 0) {
          setMovieList(results);
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
    <div className="bg-gradient-to-tr from-black to-white/20">
      <Navbar />
      <div className="font-poppins mx-auto pt-[100px] md:pt-[150px]  w-11/12 md:w-10/12 text-white pb-10">
        <div className="text-center pb-5 md:pb-10 ">
          <h2 className=" md:text-4xl text-2xl font-semibold">
            {typeModifier} MOVIE
          </h2>
        </div>
        <div className="flex flex-wrap w-full">
          {movieList.map((movie) => (
            <div
              key={movie.id}
              className="w-6/12 md:w-4/12 lg:w-3/12 box-border p-1 md:p-4"
            >
              <Card
                title={movie.title}
                overview={movie.overview}
                poster={movie.poster_path}
                id={movie.id}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieType;
