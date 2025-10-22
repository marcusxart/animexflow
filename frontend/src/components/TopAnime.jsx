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
    <aside className="bg-body-2 w-full pt-2  pb-4 rounded-lg flex flex-col gap-3">
      <div className="w-full flex items-center gap-6 px-4">
        <Header title={"Top anime"} />
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
      <ul className="w-full flex flex-col gap-4">
        {top10?.map((item, index) => (
          <li key={item?.id}>
            {index === 0 ? (
              <Link
                className="w-full block relative  bg-center bg-cover bg-no-repeat "
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="h-[160px] relative backgroud-gradient-4 w-full flex items-end py-3 px-4">
                  <div className="grid grid-cols-[40px_1fr] w-full items-center gap-3">
                    <div className="w-full h-10 rounded-sm grid place-items-center text-white count-title bg-secondary text-lg font-medium">
                      {index + 1}
                    </div>

                    <div className="flex w-full flex-col gap-1.5">
                      <p className="text-white w-full truncate-lines text-sm">
                        {item?.title}
                      </p>
                      <div>
                        <Badge rounded>Ep 3</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <HoverWrapper>
                {(isHovered) => (
                  <Link className="block">
                    <div className="grid grid-cols-[40px_1fr] w-full items-center gap-3 px-4">
                      <div
                        className={classNames(
                          "w-full h-10 rounded-sm grid place-items-center border-[1.5px] border-text count-title text-lg font-medium transition-all duration-250",
                          { "text-white border-white": isHovered }
                        )}
                      >
                        {index + 1}
                      </div>
                      <div className="grid grid-cols-[46px_1fr] w-full gap-3">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-[56px] object-cover rounded"
                        />
                        <div className="grid w-full grid-rows-2 gap-1.5">
                          <p
                            className={classNames(
                              "w-full truncate text-sm transition-all duration-250",
                              { "text-white": isHovered }
                            )}
                          >
                            {item?.title}
                          </p>
                          <div>
                            <Badge rounded>Ep 3</Badge>
                          </div>
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
