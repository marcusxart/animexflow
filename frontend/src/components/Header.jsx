import classNames from "classnames";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ title, link, italic }) => (
  <div className="flex items-center w-full justify-between gap-6">
    <h2
      className={classNames("text-2xl text-white font-medium", {
        italic: italic,
      })}
    >
      {title}
    </h2>
    {link && (
      <Link
        to={link}
        className="text-xs transition-all duration-250 hover:text-secondary-hover flex items-center gap-1"
      >
        View more
        <ChevronRight size={12} />
      </Link>
    )}
  </div>
);

export default Header;
