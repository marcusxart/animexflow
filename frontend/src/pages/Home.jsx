import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Clapperboard,
  Clock3,
  Tv,
  Info,
} from "lucide-react";
import { generateRandomAnimeData } from "../utils/sampleData";
import { iconSizes } from "../utils/constants";
import Badge from "../components/badge";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../components/Card";
import { useMemo } from "react";
import Header from "../components/Header";
import TopAnime from "../components/TopAnime";

const Home = () => {
  const spotLights = useMemo(() => generateRandomAnimeData(5), []);
  const recentAnimes = useMemo(() => generateRandomAnimeData(10), []);
  const trending = useMemo(() => generateRandomAnimeData(5), []);

  /** Custom Bottom-Right Navigation Buttons (more visible) */
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Next"
      className="absolute bottom-[100px] right-[40px] z-30 
      bg-white/20 hover:bg-white/40 border border-white/30 
      backdrop-blur-md p-3 rounded-full transition-all duration-200 hover:scale-110"
    >
      <ChevronRight size={26} className="text-white opacity-90" />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Previous"
      className="absolute bottom-[100px] right-[100px] z-30 
      bg-white/20 hover:bg-white/40 border border-white/30 
      backdrop-blur-md p-3 rounded-full transition-all duration-200 hover:scale-110"
    >
      <ChevronLeft size={26} className="text-white opacity-90" />
    </button>
  );

  /** Slider Config */
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const badgeCn = "text-sm flex items-center gap-1.5 font-medium";

  return (
    <div className="flex flex-col gap-[70px] w-full">
      {/* === Spotlight Slider === */}
      <div className="relative mt-[-80px]">
        <Slider {...settings}>
          {spotLights.map((anime) => (
            <div key={anime.id}>
              <div
                className="relative w-full bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${anime.image})` }}
              >
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/40 to-transparent z-[1]" />
                <div className="absolute left-0 top-0 bottom-0 w-[250px] bg-gradient-to-r from-[#0e0e0e] via-transparent to-transparent z-[2]" />
                <div className="absolute right-0 top-0 bottom-0 w-[250px] bg-gradient-to-l from-[#0e0e0e] via-transparent to-transparent z-[2]" />

                {/* Content */}
                <div className="relative z-[3] px-12 flex flex-col justify-end h-[600px] w-full pb-[100px] max-w-[700px]">
                  <h1 className="text-white text-5xl font-semibold truncate-clamp truncate-2-lines text-shadow-lg/30">
                    {anime.title}
                  </h1>

                  <div className="flex items-center flex-wrap gap-3 mt-3 text-sm text-gray-200">
                    <div className={badgeCn}>
                      {anime.type === "tv" ? (
                        <Tv strokeWidth={iconSizes.normal} />
                      ) : (
                        <Clapperboard strokeWidth={iconSizes.normal} />
                      )}
                      {anime.type === "tv" ? "TV" : "Movie"}
                    </div>
                    <div className={badgeCn}>
                      <Clock3 strokeWidth={iconSizes.normal} /> 24m
                    </div>
                    <div className={badgeCn}>
                      <CalendarDays strokeWidth={iconSizes.normal} />
                      Oct 24, 2025
                    </div>

                    <Badge alt rounded>
                      HD
                    </Badge>
                    <Badge rounded>CC</Badge>
                    <Badge rounded>DUB</Badge>
                  </div>

                  <p className="truncate-clamp truncate-2-lines text-base text-gray-300 mt-3 text-shadow-lg/30">
                    {anime.description}
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <Link>
                      <Button small accentColor>
                        <CirclePlay strokeWidth={iconSizes.normal} />
                        Watch now
                      </Button>
                    </Link>

                    {/* Details button with icon */}
                    <Link>
                      <Button small variant="secondary">
                        <Info strokeWidth={iconSizes.normal} />
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* === Main Content === */}
      <div className="grid grid-cols-[1fr_350px] gap-10">
        <div className="w-full gap-[70px] flex flex-col">
          <div className="w-full flex flex-col gap-6">
            <Header title="Trending" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-[32px_20px]">
              {trending?.map((anime) => (
                <Card key={anime.id} data={anime} />
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <Header title="Latest Episode" link="/" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-[32px_20px]">
              {recentAnimes?.map((anime) => (
                <Card key={anime.id} data={anime} />
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-6">
            <Header title="New on AnimeXflow" link="/" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-[32px_20px]">
              {recentAnimes?.map((anime) => (
                <Card key={anime.id} data={anime} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[60px]">
          <TopAnime />
        </div>
      </div>
    </div>
  );
};

export default Home;
