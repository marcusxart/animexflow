import { CalendarDays, Clapperboard, Clock3, Play, Tv } from "lucide-react";
import { generateRandomAnimeData } from "../utils/sampleData";
import { iconSizes } from "../utils/constants";
import Badge from "../components/badge";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Bookmark from "../components/Bookmark";

const Home = () => {
  const amime = generateRandomAnimeData(1)[0];

  const badgeCn = "text-sm flex items-center gap-1.5 font-medium";
  return (
    <div className="flex flex-col gap-[70px] w-full">
      <div
        className="w-full mt-[-80px]"
        style={{ backgroundImage: `url(${amime.image})` }}
      >
        <div className="w-full backgroud-gradient-2 ">
          <div className="w-full backgroud-gradient-3">
            <div className="flex flex-col justify-end gap-4 h-[600px] w-1/2 pb-[90px]">
              <h1 className="text-white text-5xl font-medium truncate-clamp truncate-2-lines text-shadow-lg/30 ">
                {amime.title}
              </h1>
              <div className="flex items-center w-full gap-3">
                <div className={badgeCn}>
                  {amime.type === "tv" ? (
                    <Tv strokeWidth={iconSizes.normal} />
                  ) : (
                    <Clapperboard strokeWidth={iconSizes.normal} />
                  )}{" "}
                  {amime.type === "tv" ? "TV" : "Movie"}
                </div>
                <div className={badgeCn}>
                  <Clock3 strokeWidth={iconSizes.normal} />
                  24m
                </div>
                <div className={badgeCn}>
                  <CalendarDays strokeWidth={iconSizes.normal} />
                  Oct 24, 2025
                </div>

                <Badge alt>HD</Badge>

                <Badge>CC</Badge>
                <Badge>DUB</Badge>
              </div>
              <p className="truncate-clamp truncate-2-lines text-base text-shadow-lg/30">
                {amime.description}
              </p>
              <div className="flex items-center gap-3">
                <Link>
                  <Button>
                    <Play strokeWidth={iconSizes.normal} fill="white" />
                    Watch now
                  </Button>
                </Link>
                <Bookmark />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl text-white">Lastest episode</h2>
      </div>
    </div>
  );
};

export default Home;
