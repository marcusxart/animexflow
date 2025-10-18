import { Link, Outlet } from "react-router-dom";
import MaxContainer from "./MaxContainer";
import { logo } from "../assets/images";
import OutsideAlerter from "./OutsideAlerter";
import { useState } from "react";
import Button from "./Button";
import { LogIn, Search } from "lucide-react";
import { iconSizes } from "../utils/constants";
import { useScrollPosition } from "../hooks/useScrollPosition";
import classNames from "classnames";

const SearchDropdown = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <OutsideAlerter
      handleClick={() => {
        setToggle(false);
      }}
    >
      <div className="relative">
        <div className="bg-input-bg h-14 flex items-center  w-[400px] rounded-4xl overflow-hidden">
          <input
            type="text"
            className="flex-1 px-6 w-full text-white"
            placeholder="Search anime name"
            autoComplete="off"
            required
          />
          <Button circle accentColor>
            <Search strokeWidth={2.5} />
          </Button>
        </div>
        {toggle && <ul></ul>}
      </div>
    </OutsideAlerter>
  );
};
const AppContainer = () => {
  const { y } = useScrollPosition();

  console.log(y);
  return (
    <>
      <nav
        className={classNames("fixed left-0 right-0 top-0", {
          "background-glass": y > 80,
        })}
      >
        <MaxContainer>
          <div className="h-[80px] w-full flex items-center justify-between gap-6">
            <div className="flex items-center gap-5 flex-1">
              <Link to="/">
                <img src={logo} alt="logo" className="w-[140px]" />
              </Link>
              <SearchDropdown />
            </div>
            <Button rounded small>
              <span>Sign in</span>
              <LogIn strokeWidth={iconSizes.normal} />
            </Button>
          </div>
        </MaxContainer>
      </nav>
      <MaxContainer>
        <div className="pt-[80px] w-full pb-[89px]">
          <Outlet />
        </div>
      </MaxContainer>
    </>
  );
};

export default AppContainer;
