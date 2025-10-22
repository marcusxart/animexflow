import { Link, Outlet } from "react-router-dom";
import MaxContainer from "./MaxContainer";
import { guy, logo } from "../assets/images";
import OutsideAlerter from "./OutsideAlerter";
import { useState } from "react";
import Button from "./Button";
import { LogIn, Search } from "lucide-react";
import { alphabetData, iconSizes } from "../utils/constants";
import { useScrollPosition } from "../hooks/useScrollPosition";
import classNames from "classnames";

const SearchDropdown = () => {
  const [toggle, setToggle] = useState(false);

  console.log(alphabetData);

  return (
    <OutsideAlerter
      handleClick={() => {
        setToggle(false);
      }}
    >
      <div className="relative">
        <div className="bg-body-2 h-14 flex items-center w-[400px] rounded-4xl overflow-hidden">
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

  return (
    <>
      <nav
        className={classNames("fixed left-0 right-0 top-0 z-50", {
          "background-glass": y > 60,
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
        <div className="pt-[80px] w-full pb-[70px]">
          <Outlet />
        </div>
      </MaxContainer>
      <footer className="w-full bg-body-2 py-8 overflow-hidden">
        <MaxContainer>
          <div className="relative">
            <img src={guy} alt="" className="absolute right-0 top-[-30px]" />
            <div className="flex flex-col gap-6 w-full max-w-[950px]">
              <Link to="/" className="w-fit">
                <img src={logo} alt="logo" className="w-[140px]" />
              </Link>
              <div className="flex flex-col gap-3">
                <p className="text-sm">
                  <span className="font-semibold border-r-2 border-text pr-3 mr-3">
                    A-Z LIST
                  </span>
                  Searching anime order by alphabet name A to Z.
                </p>

                <ul className="flex items-center gap-1.5 w-fit">
                  {alphabetData?.map((item) => (
                    <li key={item?.label}>
                      <Link className="w-fit px-2 h-[32px] grid place-items-center bg-body-3 rounded-xs hover:bg-secondary hover:text-white font-medium transition-all duration-250 text-sm">
                        {item?.label}
                      </Link>{" "}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs leading-5">
                <span className="text-sm font-medium">
                  Copyright © aniwave.se. All Rights Reserved
                </span>
                <br /> This site does not store any files on its server. All
                contents are provided by non-affiliated third parties.
              </p>
            </div>
          </div>
        </MaxContainer>
      </footer>
    </>
  );
};

export default AppContainer;
