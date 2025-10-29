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
    if (!rating) return "#666"; // grey for null
    if (rating < 5) return "#ef4444"; // red
    if (rating < 7.5) return "#facc15"; // yellow
    if (rating < 8.5) return "#22c55e"; // green
    return "#16a34a"; // strong green
  };

  const ratingColor = getRatingColor(anime.rating);

  return (
    <div className="w-full grid grid-cols-[1fr_350px] gap-10">
      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-col gap-10">
        {/* Anime Info */}
        <div className="flex flex-col md:flex-row gap-8 bg-body-2 rounded-2xl p-6 shadow-lg">
          {/* Poster */}
          <div className="min-w-[260px] max-w-[260px]">
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-full h-[380px] object-cover rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between text-gray-200 gap-5 flex-1">
            <div>
              <h1 className="text-3xl font-semibold text-white mb-3">
                {anime.title}
              </h1>

              <p className="text-sm leading-6 text-gray-400 mb-4">
                {anime.description}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-body-3 text-sm rounded-full border border-body-4"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Simple Flex Details */}
              <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3 text-sm text-gray-300">
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

            {/* Circle Rating */}
            <div className="flex items-center gap-3 mt-3">
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
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
                  {anime.rating ? anime.rating : "N/A"}
                </div>
              </div>
              <span className="text-sm text-gray-400">User Rating</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-secondary hover:bg-secondary-hover transition-colors text-white text-sm font-medium">
                <Play size={16} />
                Watch Now
              </button>

              <button className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-gray-600 hover:border-secondary hover:text-secondary transition-colors text-sm font-medium text-gray-300">
                <Plus size={16} />
                Add to List
              </button>
            </div>
          </div>
        </div>

        {/* Related Anime */}
        <div className="w-full flex flex-col gap-6">
          <Header title="Related Anime" />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-[32px_20px]">
            {related?.map((anime) => (
              <Card key={anime.id} data={anime} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== SIDEBAR ===== */}
      <TopAnime />
    </div>
  );
};

export default AnimeDetails;
