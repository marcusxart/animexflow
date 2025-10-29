import { Link, Outlet } from "react-router-dom";
import MaxContainer from "./MaxContainer";
import { logo } from "../assets/images";
import OutsideAlerter from "./OutsideAlerter";
import { useState } from "react";
import { LogIn, Search, PlayCircle } from "lucide-react";
import { alphabetData } from "../utils/constants";
import { useScrollPosition } from "../hooks/useScrollPosition";
import classNames from "classnames";

/* ===================== SEARCH DROPDOWN ===================== */
const SearchDropdown = () => {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("");

  const suggested = [
    {
      title: "Attack on Titan",
      image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      type: "TV",
      year: 2013,
      duration: "24m",
      score: 9.1,
      episodes: 75,
      rating: "R - 17+",
    },
    {
      title: "Solo Leveling",
      image: "https://cdn.myanimelist.net/images/anime/1700/141702.jpg",
      type: "TV",
      year: 2024,
      duration: "23m",
      score: 8.7,
      episodes: 12,
      rating: "PG-13",
    },
    {
      title: "Demon Slayer: Kimetsu no Yaiba",
      image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      type: "TV",
      year: 2019,
      duration: "24m",
      score: 8.6,
      episodes: 26,
      rating: "R - 17+",
    },
    {
      title: "Jujutsu Kaisen",
      image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
      type: "TV",
      year: 2020,
      duration: "24m",
      score: 8.8,
      episodes: 24,
      rating: "R - 17+",
    },
  ];

  const results = query
    ? suggested.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : suggested;

  const handleFocus = () => setToggle(true);

  return (
    <OutsideAlerter handleClick={() => setToggle(false)}>
      <div className="relative w-full max-w-[580px]">
        {/* Search Input */}
        <div className="flex items-center bg-body-2 border border-body-3/40 h-12 rounded-full overflow-hidden focus-within:border-secondary/80 transition-all duration-200 shadow-inner">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search anime..."
            className="flex-1 px-6 py-2 text-sm text-white bg-transparent outline-none placeholder:text-gray-400"
          />
          <button
            className="w-12 h-12 flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-all duration-200"
            type="button"
          >
            <Search strokeWidth={2.5} />
          </button>
        </div>

        {/* Search Helper */}
        {toggle && (
          <div className="absolute top-[110%] left-0 w-full bg-body-2/95 backdrop-blur-md rounded-xl border border-body-3/40 p-3 z-20 shadow-xl animate-fadeIn">
            <p className="text-xs text-gray-400 mb-3 px-2 uppercase tracking-wider">
              Search Results
            </p>

            {results.length > 0 ? (
              <ul className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-body-3/60 scrollbar-track-transparent">
                {results.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-body-3/60 cursor-pointer transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.type} • {item.year} • {item.duration}
                      </p>
                      <div className="text-xs text-gray-400 mt-1">
                        <span className="text-secondary font-medium">
                          ⭐ {item.score}
                        </span>{" "}
                        • {item.episodes} eps • {item.rating}
                      </div>
                    </div>
                    <PlayCircle
                      size={18}
                      className="text-gray-500 hover:text-secondary transition"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-gray-400 text-sm">
                <div className="w-16 h-16 rounded-full bg-body-3/40 flex items-center justify-center mb-3">
                  <Search size={28} className="opacity-40" />
                </div>
                <p>No anime found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </OutsideAlerter>
  );
};

/* ===================== MAIN APP CONTAINER ===================== */
const AppContainer = () => {
  const { y } = useScrollPosition();

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav
        className={classNames(
          "fixed left-0 right-0 top-0 z-50 border-b border-transparent transition-all duration-300",
          {
            "background-glass border-b border-body-3/40 shadow-lg": y > 60,
          }
        )}
      >
        <MaxContainer>
          <div className="h-[80px] w-full flex items-center justify-between gap-6">
            {/* Left: Logo + Search */}
            <div className="flex items-center gap-5 flex-1">
              <Link to="/home">
                <img src={logo} alt="logo" className="w-[140px]" />
              </Link>
              <SearchDropdown />
            </div>

            {/* Right: Sign In (Primary Color) */}
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-hover shadow-md hover:shadow-primary/40 transition-all">
              <LogIn strokeWidth={2.5} />
              Sign In
            </button>
          </div>
        </MaxContainer>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <MaxContainer>
        <div className="pt-[80px] w-full pb-[70px]">
          <Outlet />
        </div>
      </MaxContainer>

      {/* ===== FOOTER ===== */}
      <footer className="w-full bg-body-2 border-t border-body-3/50 py-12 mt-10">
        <MaxContainer>
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* ===== Brand & About ===== */}
            <div className="flex flex-col gap-5 max-w-md">
              <Link to="/" className="w-fit">
                <img src={logo} alt="logo" className="w-[150px]" />
              </Link>
              <p className="text-sm text-gray-300 leading-6">
                Explore the world of anime — from trending shows to hidden gems.
                Stay updated, stream, and discover your next favorite series,
                all in one place.
              </p>
            </div>

            {/* ===== A-Z Navigation ===== */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-100 border-l-4 border-primary pl-2">
                Browse A–Z
              </h3>
              <ul className="flex flex-wrap gap-2 max-w-[420px]">
                {alphabetData?.map((item) => (
                  <li key={item.label}>
                    <Link
                      className="px-3 py-1.5 rounded-md bg-body-3/70 hover:bg-primary hover:text-white text-sm text-gray-300 font-medium transition-all duration-200"
                      to="#"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== Disclaimer ===== */}
            <div className="flex flex-col justify-between text-sm text-gray-400 max-w-sm">
              <div className="space-y-2">
                <p className="font-medium text-gray-300">Disclaimer</p>
                <p className="leading-6">
                  This site does not store any files on its server. All contents
                  are provided by non-affiliated third parties.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-body-3/40 mt-10 pt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary font-medium">AnimeWave</span>. All
            rights reserved.
          </div>
        </MaxContainer>
      </footer>
    </>
  );
};

export default AppContainer;
