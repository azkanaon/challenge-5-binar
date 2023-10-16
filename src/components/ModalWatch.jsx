import { useState, useEffect } from "react";
// import { getVideo } from "../api/api";
import PropTypes from "prop-types";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import axios from "axios";

const ModalWatch = ({ id, close, isOpen }) => {
  const [video, setVideo] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  // ambil video
  useEffect(() => {
    const getVideo = async () => {
      try {
         const token =
           "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzg2ZTYyNzJlMzBmOTllYTcwMDFkZjIyMDU2MmMyMCIsInN1YiI6IjY1MTQyMzE0ZWE4NGM3MDEyZDY1OTJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.INnzfVANntwKdm90EbXy-BwcxvthBtP6UWwXpCuTOMc";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { results } = response.data;
        if (results.length > 0) {
          setVideo(results);
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

    getVideo();
  }, [id]);

  return (
    <div>
      {/* videoId akan mengarahkan ke youtube */}
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId={video[0] && video[0].key ? video[0].key : ""}
        onClose={() => close()}
      />
    </div>
  );
};

ModalWatch.propTypes = {
  id: PropTypes.number,
  close: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ModalWatch;
