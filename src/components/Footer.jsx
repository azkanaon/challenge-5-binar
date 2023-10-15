import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[15vh] flex-col bg-gradient-to-t from-white/10 to-black/100 flex justify-center items-center">
      <div className="w-10/12 md:w-6/12 flex justify-around text-white text-2xl">
        <Link to="https://www.facebook.com/boong.boong.509511" target="_blank">
          <span className="inline-block duration-300 hover:scale-110 hover:translate-y-[-10px]">
            <ion-icon name="logo-facebook"></ion-icon>
          </span>
        </Link>
        <Link to="https://github.com/azkanaon" target="_blank">
          <span className="inline-block duration-300 hover:scale-110 hover:translate-y-[-10px]">
            <ion-icon name="logo-github"></ion-icon>
          </span>
        </Link>
        <Link to="https://www.instagram.com/ajkaaa_/" target="_blank">
          <span className="inline-block duration-300 hover:scale-110 hover:translate-y-[-10px]">
            <ion-icon name="logo-instagram"></ion-icon>
          </span>
        </Link>
        <Link
          to="https://www.youtube.com/channel/UCaFVjsujgoSrkP1oyj49R0A"
          target="_blank"
        >
          <span className="inline-block duration-300 hover:scale-110 hover:translate-y-[-10px]">
            <ion-icon name="logo-youtube"></ion-icon>
          </span>
        </Link>
        <Link to="https://www.tiktok.com/@ajkaaa_4" target="_blank">
          <span className="inline-block duration-300 hover:scale-110 hover:translate-y-[-10px]">
            <ion-icon name="logo-tiktok"></ion-icon>
          </span>
        </Link>
      </div>
      <h3 className="text-white">Copyright by Ajkaa</h3>
    </div>
  );
};

export default Footer;
