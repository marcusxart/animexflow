import { useMemo } from "react";
import Filtering from "../components/Filtering";
import TopAnime from "../components/TopAnime";
import { generateRandomAnimeData } from "../utils/sampleData";
import Header from "../components/Header";
import Card from "../components/Card";

const Filter = () => {
  const searched = useMemo(() => generateRandomAnimeData(20), []);

  return (
    <div>
      {/* Responsive grid */}
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-[1fr_320px] 
          gap-8 md:gap-10
        "
      >
        {/* MAIN CONTENT */}
        <div>
          <Filtering />

          <div className="mt-10 flex flex-col gap-6 w-full">
            <Header title={"Search results for: hh"} italic />

            {/* Responsive Card Grid */}
            <div
              className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5 
                gap-4 sm:gap-5 md:gap-6
              "
            >
              {searched?.map((anime) => (
                <Card key={anime.id} data={anime} />
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR: Top Anime */}
        <div className="order-last md:block">
          <TopAnime />
        </div>
      </div>
    </div>
  );
};

export default Filter;
