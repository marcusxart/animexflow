import { useState } from "react";
import Dropdown from "./Dropdown";
import {
  animeLanguageOptions,
  animeRatedOptions,
  animeSeasonOptions,
  animeSortptions,
  animeStatusOptions,
  animeTypeOptions,
  genreOptions,
  yearOptions,
} from "../utils/constants";
import Button from "./Button";
import { Funnel } from "lucide-react";
import classNames from "classnames";

const Filtering = ({
  defaultValue = {
    type: "",
    status: "",
    season: "",
    language: "",
    sort: "",
    rated: "",
    sy: "",
    ey: "",
    genre: [],
    keyword: "",
  },
}) => {
  const [value, setValue] = useState(defaultValue);

  const isInGenre = (val) => value.genre?.includes(val);
  const toggleGenre = (val) => {
    setValue((prev) => {
      const isIn = prev.genre.includes(val);
      return {
        ...prev,
        genre: isIn
          ? prev.genre.filter((item) => item !== val)
          : [...prev.genre, val],
      };
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full bg-body-2/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-md">
      {/* Dropdown Filters */}
      <div>
        <h3 className="text-xl sm:text-2xl mb-3 font-semibold text-white">
          Filter
        </h3>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <li>
            <Dropdown
              options={animeTypeOptions}
              placeholder="Select type"
              placeholderLabel="Type"
              value={value.type}
              onChange={(val) => setValue((prev) => ({ ...prev, type: val }))}
            />
          </li>
          <li>
            <Dropdown
              options={animeStatusOptions}
              placeholder="Select status"
              placeholderLabel="Status"
              value={value.status}
              onChange={(val) => setValue((prev) => ({ ...prev, status: val }))}
            />
          </li>
          <li>
            <Dropdown
              options={animeRatedOptions}
              placeholder="Select rated"
              placeholderLabel="Rated"
              value={value.rated}
              onChange={(val) => setValue((prev) => ({ ...prev, rated: val }))}
            />
          </li>
          <li>
            <Dropdown
              options={animeSeasonOptions}
              placeholder="Select season"
              placeholderLabel="Season"
              value={value.season}
              onChange={(val) => setValue((prev) => ({ ...prev, season: val }))}
            />
          </li>
          <li>
            <Dropdown
              options={animeLanguageOptions}
              placeholder="Select language"
              placeholderLabel="Language"
              value={value.language}
              onChange={(val) =>
                setValue((prev) => ({ ...prev, language: val }))
              }
            />
          </li>
          <li>
            <Dropdown
              options={animeSortptions}
              placeholder="Select sort"
              placeholderLabel="Sort"
              value={value.sort}
              onChange={(val) => setValue((prev) => ({ ...prev, sort: val }))}
            />
          </li>
          <li>
            <Dropdown
              options={yearOptions}
              placeholder="Start year"
              placeholderLabel="Start year"
              value={value.sy}
              onChange={(val) => setValue((prev) => ({ ...prev, sy: val }))}
            />
          </li>
          <li>
            <Dropdown
              options={yearOptions}
              placeholder="End year"
              placeholderLabel="End year"
              value={value.ey}
              onChange={(val) => setValue((prev) => ({ ...prev, ey: val }))}
            />
          </li>
        </ul>
      </div>

      {/* Genre Filters */}
      <div>
        <h3 className="text-xl sm:text-2xl mb-3 font-semibold text-white">
          Genre
        </h3>
        <ul className="flex flex-wrap gap-2 sm:gap-3">
          {genreOptions.map((item) => {
            const active = isInGenre(item.value);
            return (
              <li
                key={item.value}
                onClick={() => toggleGenre(item.value)}
                className={classNames(
                  "cursor-pointer select-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200",
                  "hover:scale-105 hover:shadow-sm",
                  active
                    ? "bg-secondary text-white border-secondary"
                    : "bg-body-3 text-gray-300 border-body-3 hover:bg-body"
                )}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Filter Button */}
      <Button
        className="bg-accent hover:bg-accent-hover w-full sm:w-fit text-white font-medium flex items-center justify-center gap-2"
        small
      >
        <Funnel size={16} />
        Filter
      </Button>
    </div>
  );
};

export default Filtering;
