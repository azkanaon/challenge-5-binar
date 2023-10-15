import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import imageError from "../assets/image/error.png";

const CardSearch = ({
  title,
  year,
  vote_average,
  vote_count,
  popularity,
  id,
  backdrop,
  poster,
}) => {
  const imageUrl = import.meta.env.VITE_REACT_W500IMAGE;
  // digunakan ketika menampilkan card saat search
  return (
    // arahkan ke detal ketika dipencet
    <Link to={`/movie/detail/${id}`}>
      <div className="font-poppins text-white rounded-md shadow-md neon-slate overflow-hidden flex box-border flex-wrap 6/12 md:w-full lg:3/12 h-full relative hover:scale-105 hover:translate-y-[-10px] duration-300">
        <div
          className="absolute top-0 left-0 w-full h-full blur-sm"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${imageUrl}${backdrop})`,
          }}
        ></div>
        <div className=" z-10 w-full h-full flex">
          <div className="w-4/12">
            <img
              className="object-cover rounded-md w-full h-full"
              src={poster ? `${imageUrl}${poster}` : imageError}
              alt=""
            />
          </div>
          <div className="w-8/12 h-full ">
            <div className=" overflow-hidden h-3/6 flex flex-col py-2 px-3">
              <h1 className="shadow-text text-xl font-semibold">{title}</h1>
              <p className="opacity-80 text-sm mt-2">
                {new Date(year).getFullYear()}
              </p>
            </div>
            <div className="flex h-3/6 pb-3  justify-between px-2">
              <div className="flex flex-col justify-between py-1">
                <p className="text-center pt-6 text-lg font-semibold">
                  {vote_average.toFixed(1)}
                </p>
                <p className="text-[10px]">Vote Average</p>
              </div>
              <div className="flex flex-col justify-between py-1">
                <p className="text-center pt-6 text-lg font-semibold">
                  {vote_count}
                </p>
                <p className="text-[10px]">Vote Count</p>
              </div>
              <div className="flex flex-col justify-between py-1">
                <p className="text-center pt-6 text-lg font-semibold">
                  {popularity}
                </p>
                <p className="text-[10px]">Popularity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

CardSearch.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  year: PropTypes.string,
  backdrop: PropTypes.string,
  vote_average: PropTypes.number,
  vote_count: PropTypes.number,
  popularity: PropTypes.number,
  poster: PropTypes.string,
};

export default CardSearch;
