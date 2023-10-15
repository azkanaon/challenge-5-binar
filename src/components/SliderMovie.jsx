import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Card from "./Card";
import PropTypes from "prop-types";

const SliderMovie = ({ movieList }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      pagination={false}
      grabCursor={true}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {movieList.map((movie) => (
        <SwiperSlide key={movie.id} className="lg:flex lg:justify-center">
          <Card
            title={movie.title}
            overview={movie.overview}
            poster={movie.poster_path}
            id={movie.id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

SliderMovie.propTypes = {
  movieList: PropTypes.array,
};

export default SliderMovie;
