import { useMemo } from "react";
import Filtering from "../components/Filtering";
import TopAnime from "../components/TopAnime";
import { generateRandomAnimeData } from "../utils/sampleData";
import Header from "../components/Header";
import Card from "../components/Card";

const Filter = () => {
  const searched = useMemo(() => generateRandomAnimeData(20), []);
  return (
    <div className="pt-[24px]">
      <div className="grid grid-cols-[1fr_350px] gap-10">
        <div>
          <Filtering />

          <div className="mt-[40px] flex flex-col gap-6 w-full ">
            <Header title={"Search results for: hh"} italic />

            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-[32px_20px]">
              {searched?.map((anime) => (
                <Card key={anime.id} data={anime} />
              ))}
            </div>
          </div>
        </div>

        <TopAnime />
      </div>
    </div>
  );
};

export default Filter;
