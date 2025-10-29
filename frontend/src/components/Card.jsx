import { CirclePlay, Dot } from "lucide-react";
import Badge from "./badge";
import HoverWrapper from "./HoverWrapper";
import { Link } from "react-router-dom";
import classNames from "classnames";

const Card = ({ data }) => {
  return (
    <HoverWrapper>
      {(isHovered) => (
        <Link
          to={`/anime/${data?.id || "#"}`}
          className="flex flex-col w-full gap-2 group"
        >
          {/* Thumbnail */}
          <div className="w-full h-[240px] relative rounded-lg overflow-hidden">
            <img
              src={data?.image}
              alt={data?.title || "Anime Thumbnail"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div
              className={classNames(
                "absolute inset-0 bg-body/50 z-[2] transition-opacity duration-300",
                { "opacity-100": isHovered, "opacity-0": !isHovered }
              )}
            />

            {/* Play Icon */}
            <CirclePlay
              className={classNames(
                "absolute z-[3] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                {
                  "opacity-80 scale-100": isHovered,
                  "opacity-0 scale-50": !isHovered,
                }
              )}
              size={64}
              strokeWidth={1.5}
            />

            {/* Badges */}
            <Badge className="absolute top-0 left-0 z-[4]" alt>
              HD
            </Badge>

            {data?.type === "tv" && (
              <Badge className="absolute bottom-0 left-0 z-[4]">Ep 1</Badge>
            )}

            {(data?.language?.sub || data?.language?.dub) && (
              <Badge className="absolute bottom-0 right-0 z-[4]">
                {data?.language?.sub && "SUB "}
                {data?.language?.dub && "DUB"}
              </Badge>
            )}
          </div>

          {/* Info */}
          <div className="w-full">
            <h3
              className={classNames(
                "truncate w-full font-medium transition-colors duration-250",
                { "text-white": isHovered }
              )}
            >
              {data?.title}
            </h3>
            <p className="flex items-center gap-1 text-xs leading-4 text-gray-400">
              {data?.type === "tv" ? "TV" : "Movie"}
              <Dot size={16} />
              24m
            </p>
          </div>
        </Link>
      )}
    </HoverWrapper>
  );
};

export default Card;
