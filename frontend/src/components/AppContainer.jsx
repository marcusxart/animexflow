import { Link, Outlet } from "react-router-dom";
import MaxContainer from "./MaxContainer";
import { logo } from "../assets/images";
import OutsideAlerter from "./OutsideAlerter";
import { useState } from "react";
import { LogIn, Search, PlayCircle, Menu, X } from "lucide-react";
import { alphabetData } from "../utils/constants";
import classNames from "classnames";
import { useToast } from "./ToastProvider";

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
      <div className="relative w-full">
        {/* ===== Search Input Bar ===== */}
        <div className="flex items-center bg-[#29293f]/80 border border-gray-700 h-12 rounded-md overflow-hidden focus-within:border-pink-400 transition-all duration-200 shadow-md backdrop-blur-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search anime..."
            className="flex-1 px-4 py-2 text-sm text-gray-200 bg-transparent outline-none placeholder:text-gray-500"
          />
          <button
            className="w-12 h-12 flex items-center justify-center bg-pink-500 hover:bg-pink-600 transition"
            type="button"
          >
            <Search strokeWidth={2.5} />
          </button>
        </div>

        {/* ===== Search Results Dropdown ===== */}
        {toggle && (
          <div className=" w-full bg-[#1c1c2a]/95 rounded-lg border border-gray-700 shadow-xl z-50 animate-fadeIn overflow-hidden backdrop-blur-md">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#29293f]/60">
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Search Results
              </p>
              <button
                onClick={() => setQuery("")}
                className="text-xs text-gray-400 hover:text-white transition"
              >
                Clear
              </button>
            </div>

            {/* Results List */}
            {results.length > 0 ? (
              <ul className="flex flex-col max-h-[230px]  sm:max-h-[380px] overflow-y-auto divide-y divide-gray-800">
                {results.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#2a2a3d] transition cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[55px] h-[75px] object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-100 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.type} • {item.year} • {item.duration}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        <span className="text-pink-400 font-semibold">
                          ⭐ {item.score}
                        </span>{" "}
                        • {item.episodes} eps • {item.rating}
                      </p>
                    </div>
                    <PlayCircle
                      size={18}
                      className="text-gray-500 hover:text-pink-400 transition"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-sm">
                <Search size={28} className="opacity-40 mb-2" />
                <p>No anime found matching your search.</p>
              </div>
            )}

            {/* View All Button */}
            <div className="px-4 py-3 border-t border-gray-700 bg-[#29293f]/70 hover:bg-[#33334f] transition">
              <button className="w-full text-center text-sm font-medium text-pink-400 hover:text-pink-300">
                View all results →
              </button>
            </div>
          </div>
        )}
      </div>
    </OutsideAlerter>
  );
};

/* ===================== SIDE MENU ===================== */
const SideMenu = ({ open, onClose }) => {
  const links = [
    { label: "Home", to: "/home" },
    { label: "Sub Anime", to: "/sub-anime" },
    { label: "Dub Anime", to: "/dub-anime" },
    { label: "Most Popular", to: "/popular" },
    { label: "Movies", to: "/movies" },
    { label: "TV Series", to: "/tv-series" },
    { label: "OVAs", to: "/ovas" },
    { label: "ONAs", to: "/onas" },
  ];

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-[9998]",
          { "opacity-100 visible": open, "opacity-0 invisible": !open }
        )}
        onClick={onClose}
      ></div>

      <div
        className={classNames(
          "fixed top-0 left-0 h-full w-[270px] bg-[#1b1b2f] border-r border-gray-700 shadow-2xl transform transition-transform duration-300 z-[9999]",
          { "translate-x-0": open, "-translate-x-full": !open }
        )}
      >
        <div className="flex items-center justify-between px-5 h-[80px] border-b border-gray-700">
          <img src={logo} alt="logo" className="w-[120px]" />
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col">
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              onClick={onClose}
              className="px-5 py-4 text-gray-200 border-b border-gray-800 hover:text-white hover:bg-[#2b2b44] transition-all duration-150 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

/* ===================== MAIN APP CONTAINER ===================== */
const AppContainer = () => {
  const { addToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ===== NAVBAR ===== */}
      <nav className="fixed left-0 right-0 top-0 z-[9980] bg-[#1b1b2f]/90 backdrop-blur-md border-b border-gray-700 shadow-lg transition-all duration-300">
        <MaxContainer>
          <div className="h-[80px] w-full flex items-center justify-between gap-6">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen(true)}
                className="text-white hover:text-pink-400 transition"
              >
                <Menu size={26} />
              </button>
              <Link to="/home">
                <img src={logo} alt="logo" className="w-[140px]" />
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="text-white hover:text-pink-400 transition"
              >
                {searchOpen ? (
                  <X size={24} strokeWidth={2.5} />
                ) : (
                  <Search size={24} strokeWidth={2.5} />
                )}
              </button>

              <button
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 shadow-md transition"
                onClick={() => addToast("success", "Creating your account...")}
              >
                <LogIn strokeWidth={2.5} />
                Sign In
              </button>
            </div>
          </div>
        </MaxContainer>

        {/* ===== Search Section ===== */}
        <div
          className={classNames(
            "absolute left-0 right-0 overflow-hidden transition-all duration-300 z-[9970]",
            {
              "max-h-[600px] opacity-100 visible": searchOpen,
              "max-h-0 opacity-0 invisible": !searchOpen,
            }
          )}
        >
          <div className="bg-[#1c1c2a]/95 border-t border-gray-700 backdrop-blur-md px-4 py-5">
            <SearchDropdown />
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <MaxContainer>
        <div className="pt-[80px] w-full pb-[70px]">
          <Outlet />
        </div>
      </MaxContainer>

      <footer className="w-full bg-body-2 border-t border-body-3/50 py-12 mt-10">
        <MaxContainer>
          <div className="flex flex-col lg:flex-row justify-between gap-12">
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
