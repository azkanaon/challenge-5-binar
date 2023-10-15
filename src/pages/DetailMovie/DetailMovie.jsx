import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import ButtonWatch from "../../components/ButtonWatch";
import ModalWatch from "../../components/ModalWatch";
import Footer from "../../components/Footer";

const DetailMovie = () => {
  const [getDetailData, setGetDetailData] = useState([]);
  const imageUrlHD = import.meta.env.VITE_REACT_W780IMAGE;
  const imageUrl = import.meta.env.VITE_REACT_W500IMAGE;
  const { id } = useParams();
  // pengaturan untuk modal di page detail
  const [isOpen, setOpen] = useState(false);
  const handleChange = () => {
    setOpen(!isOpen);
  };
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  // ambil movie dengan tipe popular
  useEffect(() => {
    const getDetailMovie = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_BASEURL}/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_REACT_TOKEN}`,
            },
          }
        );
        const { data } = response;
        if (data) {
          setGetDetailData(data);
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

    getDetailMovie();
  }, [id]);
  return (
    <div className="font-poppins">
      <Navbar />
      <div
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.25)), url(${imageUrlHD}${getDetailData.backdrop_path})`,
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          backgroundSize: "cover",
        }}
        className=" h-screen w-full box-border flex justify-center"
      >
        <div className=" text-white w-10/12 md:w-8/12 flex flex-col md:flex-row items-center">
          <div className="w-full pt-[90px] md:pt-0  md:w-6/12 flex justify-center md:justify-end md:pr-10">
            <img
              className="w-5/12 md:w-full lg:w-8/12 rounded-xl shadow-xl neon-slate"
              src={
                getDetailData.poster_path
                  ? `${imageUrl}${getDetailData.poster_path}`
                  : ""
              }
              alt={getDetailData.title}
            />
          </div>
          <div className="w-full pt-2 md:pt-0 md:w-6/12">
            <h1 className="shadow-text font-semibold text-xl md:text-4xl">
              {getDetailData.title} (
              {new Date(getDetailData.release_date).getFullYear()})
            </h1>
            <p className="text-sm md:text-lg py-1 md:py-2">
              <span className="text-yellow-400 ">
                <ion-icon name="star"></ion-icon>
              </span>
              <span className="">
                {getDetailData.vote_average
                  ? getDetailData.vote_average.toFixed(1)
                  : "Unknown"}
              </span>{" "}
              <span className="">
                | {getDetailData.runtime ? getDetailData.runtime : "Unknown"}{" "}
                min
              </span>{" "}
              | {/* looping genre */}
              {getDetailData.genres &&
                getDetailData.genres.map((genre) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
            </p>
            <p className="text-xs md:text-md h-[60px] md:h-auto overflow-auto md:overflow-visible">
              {getDetailData.overview}
            </p>
            <ModalWatch
              id={getDetailData.id ? getDetailData.id : 0}
              isOpen={isOpen}
              close={handleChange}
            />
            <ButtonWatch click={handleChange} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailMovie;
