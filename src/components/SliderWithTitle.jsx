import SliderMovie from "./SliderMovie";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SliderWithTitle = ({ movieList, title, type }) => {
  return (
    <div className="flex flex-col bg-black md:mt-3">
      <div className="flex justify-between py-5 pl-3">
        <div className="pl-2">
          <h6 className="text-white font-semibold text-lg md:text-2xl">
            {title}
          </h6>
        </div>
        <div className="text-white pr-2">
          {/* arahkan ke movie dengan type sesuai dengan yang user pencet */}
          <Link to={`/movie/${type}`}>
            <span className="inline-block text-lg cursor-pointer hover:translate-y-[-5px] hover:font-semibold duration-300">
              See all &gt;
            </span>
          </Link>
        </div>
      </div>
      <div className="mx-5 md:mx-10 flex flex-wrap h-auto">
        <SliderMovie movieList={movieList} />
      </div>
    </div>
  );
};

SliderWithTitle.propTypes = {
  movieList: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.string,
};

export default SliderWithTitle;
