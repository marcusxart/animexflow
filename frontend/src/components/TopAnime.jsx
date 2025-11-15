import { useMemo, useState } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import { generateRandomAnimeData } from "../utils/sampleData";
import { Link } from "react-router-dom";
import Badge from "./badge";
import HoverWrapper from "./HoverWrapper";
import classNames from "classnames";

const TopAnime = () => {
  const [selectedTopAnime, setSelectedTopAnime] = useState("today");
  const top10 = useMemo(() => generateRandomAnimeData(10), []);

  return (
    <aside className="bg-body-2 w-full pt-2 pb-4 rounded-lg flex flex-col gap-4 h-fit">
      {/* Header + Tabs */}
      <div className="w-full flex items-center justify-between px-3 sm:px-4">
        <Header title="Top Anime" />
        <Tabs
          value={selectedTopAnime}
          onChange={setSelectedTopAnime}
          options={[
            { label: "Today", value: "today" },
            { label: "Week", value: "week" },
            { label: "Month", value: "month" },
          ]}
        />
      </div>

      {/* Anime List */}
      <ul className="w-full flex flex-col gap-3 sm:gap-4 px-2 sm:px-0">
        {top10?.map((item, index) => (
          <li key={item?.id}>
            {index === 0 ? (
              // ===============================
              // 🔥 Top #1 (Large Preview)
              // ===============================
              <Link
                className="w-full block relative bg-center bg-cover bg-no-repeat rounded-md overflow-hidden group"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div
                  className="
                  h-[150px] sm:h-[180px] 
                  relative 
                  bg-gradient-to-t from-black/85 via-black/50 to-transparent 
                  flex items-end 
                  py-2 sm:py-3 
                  px-3 sm:px-4 
                  transition-all duration-300
                "
                >
                  <div className="grid grid-cols-[34px_1fr] sm:grid-cols-[40px_1fr] w-full items-center gap-2 sm:gap-3">
                    {/* Ranking Box */}
                    <div
                      className="
                      w-full h-9 sm:h-10 
                      rounded-sm grid place-items-center 
                      text-white bg-secondary 
                      text-sm sm:text-lg font-semibold shadow
                    "
                    >
                      {index + 1}
                    </div>

                    {/* Title + Badge */}
                    <div className="flex flex-col gap-1 text-white">
                      <p className="truncate-lines text-xs sm:text-sm font-medium leading-tight">
                        {item?.title}
                      </p>
                      <Badge rounded small>
                        Ep 3
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              // ===============================
              // 🔥 Other Ranks (Compact List)
              // ===============================
              <HoverWrapper>
                {(isHovered) => (
                  <Link className="block transition-all duration-200 hover:bg-body-3/30 rounded-md">
                    <div className="grid grid-cols-[34px_1fr] sm:grid-cols-[40px_1fr] items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5">
                      {/* Rank Number */}
                      <div
                        className={classNames(
                          "w-full h-9 sm:h-10 rounded-sm grid place-items-center border-[1.5px] border-text text-sm sm:text-base font-medium transition-all",
                          {
                            "text-white border-white bg-secondary/20":
                              isHovered,
                          }
                        )}
                      >
                        {index + 1}
                      </div>

                      {/* Thumbnail + Text */}
                      <div className="grid grid-cols-[42px_1fr] sm:grid-cols-[46px_1fr] w-full gap-2 sm:gap-3 items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="
                            w-full h-[50px] sm:h-[56px] 
                            object-cover rounded-md 
                            transition-transform duration-300
                            group-hover:scale-105
                          "
                        />
                        <div className="flex flex-col justify-center gap-1">
                          <p
                            className={classNames(
                              "truncate text-xs sm:text-sm transition-all",
                              { "text-white": isHovered }
                            )}
                          >
                            {item?.title}
                          </p>
                          <Badge rounded small>
                            Ep 3
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </HoverWrapper>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TopAnime;
