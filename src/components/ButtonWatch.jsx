import PropTypes from "prop-types";

// button watch trailer
const ButtonWatch = ({ click }) => {
  return (
    <div className="pt-3 md:my-6">
      <button
        onClick={() => click()}
        className=" bg-gradient-to-r from-yellow-600 to-yellow-500  h-9 w-full md:h-10 md:w-52 rounded-3xl font-semibold text-sm tracking-[3px] hover:bg-gradient-to-r hover:from-yellow-100 hover:to-yellow-600 hover:translate-y-[-10px] hover:scale-105 duration-300"
      >
        Watch Trailer
      </button>
    </div>
  );
};

ButtonWatch.propTypes = {
  click: PropTypes.func,
};

export default ButtonWatch;
