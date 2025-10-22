import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Clapperboard,
  Clock3,
  Tv,
} from "lucide-react";
import { generateRandomAnimeData } from "../utils/sampleData";
import { iconSizes } from "../utils/constants";
import Badge from "../components/badge";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Bookmark from "../components/Bookmark";
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

  const NextArrow = ({ onClick }) => (
    <Button
      onClick={onClick}
      accentColor
      small
      className="absolute right-5 bottom-[90px] z-10 p-0"
    >
      <ChevronRight size={24} />
    </Button>
  );

  const PrevArrow = ({ onClick }) => (
    <Button
      onClick={onClick}
      accentColor
      small
      className="absolute right-[88px] bottom-[90px] z-10 p-0"
    >
      <ChevronLeft size={24} />
    </Button>
  );

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4000,
    // fade: true,
    cssEase: "linear",
    draggable: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const badgeCn = "text-sm flex items-center gap-1.5 font-medium";

  return (
    <div className="flex flex-col gap-[70px] w-full">
      <div className="mt-[-80px]">
        <Slider {...settings}>
          {spotLights.map((anime) => (
            <div key={anime.id}>
              <div
                className="w-full  relative  bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${anime.image})` }}
              >
                <div className="w-full backgroud-gradient-2 ">
                  <div className="w-full backgroud-gradient-3">
                    <div className="flex flex-col justify-end gap-4 h-[600px] w-1/2 pb-[90px]">
                      <h1 className="text-white text-5xl font-medium truncate-clamp truncate-2-lines text-shadow-lg/30 ">
                        {anime.title}
                      </h1>
                      <div className="flex items-center w-full gap-3">
                        <div className={badgeCn}>
                          {anime.type === "tv" ? (
                            <Tv strokeWidth={iconSizes.normal} />
                          ) : (
                            <Clapperboard strokeWidth={iconSizes.normal} />
                          )}{" "}
                          {anime.type === "tv" ? "TV" : "Movie"}
                        </div>
                        <div className={badgeCn}>
                          <Clock3 strokeWidth={iconSizes.normal} />
                          24m
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
                      <p className="truncate-clamp truncate-2-lines text-base text-shadow-lg/30">
                        {anime.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Link>
                          <Button small>
                            <CirclePlay strokeWidth={iconSizes.normal} />
                            Watch now
                          </Button>
                        </Link>
                        <Bookmark />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
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
            <Header title="Lastest episode" link="/" />
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
