import { CirclePlay, Dot } from "lucide-react";
import Badge from "./badge";
import HoverWrapper from "./HoverWrapper";
import { Link } from "react-router-dom";
import classNames from "classnames";

const Card = ({ data }) => {
  return (
    <HoverWrapper>
      {(isHovered) => (
        <Link className="flex flex-col w-full gap-2">
          <div className="w-full h-[240px] relative rounded-lg overflow-hidden">
            <div
              className={classNames(
                "inset-0 bg-body/50 absolute z-[2] transition-all duration-250",
                { "opacity-0": !isHovered, "opacity-100": isHovered }
              )}
            ></div>
            <CirclePlay
              className={classNames(
                "text-white absolute z-[3] top-1/2 left-1/2 -translate-1/2 transition-all duration-250",
                {
                  "opacity-0 scale-50": !isHovered,
                  "opacity-80 scale-100": isHovered,
                }
              )}
              size={64}
              strokeWidth={1.5}
            />
            <Badge className="absolute top-0 left-0 z-[4]" alt>
              HD
            </Badge>
            {data?.type === "tv" && (
              <Badge className="absolute bottom-0 left-0 z-[4]">Ep 1</Badge>
            )}

            <Badge className="absolute bottom-0 right-0 z-[4]">
              {data?.language?.sub && "SUB "}
              {data?.language?.dub && "DUB"}
            </Badge>
            <img
              src={data.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-full">
            <h3
              className={classNames(
                "truncate w-full font-medium transition-all duration-250",
                { "text-white": isHovered }
              )}
            >
              {data?.title}
            </h3>
            <p className="flex items-center gap-1 text-xs leading-4">
              {data?.type === "tv" ? "TV" : "Movie"}
              <Dot size={20} /> 24m
            </p>
          </div>
        </Link>
      )}
    </HoverWrapper>
  );
};

export default Card;
