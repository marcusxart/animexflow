import { Play, Plus } from "lucide-react";
import TopAnime from "../components/TopAnime";
import { generateRandomAnimeData } from "../utils/sampleData";
import Card from "../components/Card";
import Header from "../components/Header";

const AnimeDetails = () => {
  const anime = {
    title: "Attack on Titan",
    poster: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    description:
      "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans. Those who survived now live in a walled city to protect themselves. However, their fragile peace is soon shattered...",
    type: "TV",
    episodes: 75,
    status: "Completed",
    rating: 9.1,
    studio: "Wit Studio / MAPPA",
    producer: "Production I.G",
    genres: ["Action", "Drama", "Fantasy", "Military"],
  };

  const related = generateRandomAnimeData(10);

  const getRatingColor = (rating) => {
    if (!rating) return "#666";
    if (rating < 5) return "#ef4444";
    if (rating < 7.5) return "#facc15";
    if (rating < 8.5) return "#22c55e";
    return "#F47521";
  };

  const ratingColor = getRatingColor(anime.rating);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-10 pt-[32  px]">
      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col gap-10">
        {/* Anime Info */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 bg-body-2 rounded-2xl p-5 sm:p-6 shadow-xl">
          {/* Poster */}
          <div className="w-full md:w-[260px] flex-shrink-0">
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-full h-[320px] sm:h-[380px] md:h-[400px] object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between gap-4 sm:gap-6 text-gray-200 flex-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
                {anime.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-6 mb-3">
                {anime.description}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-3">
                {anime.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 text-sm sm:text-base bg-body-3 rounded-full border border-body-4 text-gray-200"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Simple Details */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base text-gray-300 mt-2">
                <span>
                  <strong className="text-gray-400">Type:</strong> {anime.type}
                </span>
                <span>
                  <strong className="text-gray-400">Episodes:</strong>{" "}
                  {anime.episodes}
                </span>
                <span>
                  <strong className="text-gray-400">Status:</strong>{" "}
                  {anime.status}
                </span>
                <span>
                  <strong className="text-gray-400">Studio:</strong>{" "}
                  {anime.studio}
                </span>
                <span>
                  <strong className="text-gray-400">Producer:</strong>{" "}
                  {anime.producer}
                </span>
              </div>
            </div>

            {/* Circle Rating + Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-3">
              {/* Circle Rating */}
              <div className="flex items-center gap-2">
                <div className="relative w-[70px] h-[70px]">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-body-4"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      strokeWidth="4"
                      stroke={ratingColor}
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(anime.rating / 10) * 100}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-sm sm:text-base font-semibold">
                    {anime.rating ?? "N/A"}
                  </div>
                </div>
                <span className="text-sm sm:text-base text-gray-400">
                  User Rating
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-3 sm:mt-0">
                <button className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md bg-[#F47521] hover:bg-[#ff8435] transition-all text-white text-sm sm:text-base font-semibold shadow-md">
                  <Play size={16} />
                  Watch Now
                </button>

                <button className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md border border-gray-600 hover:border-[#F47521] hover:text-[#F47521] transition-all text-gray-300 text-sm sm:text-base font-medium">
                  <Plus size={16} />
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Anime */}
        <div className="w-full flex flex-col gap-4 sm:gap-6">
          <Header title="Related Anime" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 sm:gap-6">
            {related?.map((anime) => (
              <Card key={anime.id} data={anime} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== SIDEBAR ===== */}
      <div className="w-full lg:w-[350px] flex-shrink-0">
        <TopAnime />
      </div>
    </div>
  );
};

export default AnimeDetails;
