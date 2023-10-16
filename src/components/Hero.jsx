import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Pagination } from "swiper/modules";

import ButtonWatch from "./ButtonWatch";
import ModalWatch from "./ModalWatch";

const Hero = () => {
  const imageUrl = import.meta.env.VITE_REACT_W500IMAGE;
  const imageUrlHD = import.meta.env.VITE_REACT_W780IMAGE;
  const [currentMovie, setCurrentMovie] = useState([]);
  const [backdrop, setBackdrop] = useState([]);
  const [movieHero, setMovieHero] = useState([]);
  // menghindari error ketika awal pencarian video,
  // belum tau cara yang benar buat solve kasus ini
  const [getCurrentId, setGetCurrentId] = useState(268);
  const [isOpen, setOpen] = useState(false);
  const handleChange = () => {
    setOpen(!isOpen);
  };

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  // mengambil 5 array pertama pada api, untuk ditampilkan sebagai hero

  useEffect(() => {
    const get5PopularMovies = async () => {
      try {
         const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_API_ADDRESS}/movie/popular`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response.data;
        if (data.length > 0) {
          // untuk mengeset background dan informasi terkait (judul, release_date, dll)
          setCurrentMovie(data[0]);
          // ambil id saat ini agar dapat melihat trailer
          setGetCurrentId(data[0].id);
          setBackdrop(`${imageUrlHD}${data[0].backdrop_path}`);

          // pengambilan lima index pertama
          const first5Movies = data.slice(0, 5);
          setMovieHero([...first5Movies]);
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

    get5PopularMovies();
  }, []);

  // untuk handle perubahan background ketika di swipe
  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    // ambil data sekarang kemudian masukkan ke currenMovie
    const currentMovie = movieHero[currentIndex];
    setCurrentMovie(currentMovie);
    // id ikut diupdate agar trailer sesuai dengan film nya
    setGetCurrentId(currentMovie.id);
    // background berubah
    setBackdrop(`${imageUrlHD}${currentMovie.backdrop_path}`);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${backdrop})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className={` h-screen flex items-center justify-center flex-wrap transition-all duration-200 ease`}
    >
      <div className="w-full  md:w-6/12 text-poppins text-white px-6 md:px-10 md:mt-0 h-[50vh] md:h-auto flex flex-col justify-center ">
        <h1 className="mt-20 md:mt-0 md:my-5 text-4xl md:text-6xl font-semibold h-[48px] md:h-auto overflow-auto md:overflow-visible">
          {currentMovie.title ? currentMovie.title : ""}
        </h1>
        <p className="py-1 md:mb-2 text-lg md:text-2xl font-semibold ">
          <span className="text-yellow-400 ">
            <ion-icon name="star"></ion-icon>
          </span>
          <span>
            &nbsp;
            {currentMovie.vote_average
              ? currentMovie.vote_average.toFixed(1)
              : "Unknown"}
          </span>
          &nbsp;|&nbsp;
          <span>
            {currentMovie.release_date
              ? new Date(currentMovie.release_date).getFullYear()
              : ""}
          </span>
        </p>
        <p className="opacity-80 h-[20vh] md:h-auto overflow-auto">
          {currentMovie.overview}
        </p>
        <ModalWatch
          id={getCurrentId ? getCurrentId : 0}
          isOpen={isOpen}
          close={handleChange}
          className=""
        />
        <ButtonWatch click={handleChange} />
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <div className="w-11/12 rounded-2xl shadow-2xl neon-zinc backdrop-blur-sm bg-transparent">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 25,
              stretch: 75,
              depth: 300,
              modifier: -1,
              slideShadows: true,
            }}
            pagination={true}
            onSlideChange={handleSlideChange}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper swiper-container"
          >
            {movieHero.map((movie) => (
              <SwiperSlide key={movie.id} className="slider-2">
                <Link to={`/movie/detail/${movie.id}`}>
                  <div>
                    <img
                      className="rounded-xl shadow-sm neon-slate hover:scale-105 duration-200"
                      src={`${imageUrl}${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
