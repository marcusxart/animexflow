import { Link, useNavigate } from "react-router-dom";
import { CircleArrowRight, Search } from "lucide-react";

import { animeGroup, logo, seikoAyase } from "../assets/images";
import { aboutUs, iconSizes, links } from "../utils/constants";
import Button from "../components/Button";
import MaxContainer from "../components/MaxContainer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-[60px] w-full pt-10 pb-14">
      <header className="relative backgroud-gradient">
        <div
          className="bg-repeat absolute z-[-1] inset-0 opacity-40"
          style={{ backgroundImage: `url(${animeGroup})` }}
        />
        <MaxContainer>
          <div className="flex flex-col items-center gap-5">
            <img src={logo} alt="logo" className="w-[140px]" loading="lazy" />

            <ul className="flex items-center gap-6 font-medium mb-2">
              {links.map((link) => (
                <li
                  key={link.text}
                  className="hover:text-secondary duration-75 text-sm"
                >
                  <Link to={link.to} className="inline-block px-1">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-full flex flex-col items-center">
              <form className="w-full max-w-[600px] flex items-center gap-4">
                <input
                  placeholder="Search anime name"
                  type="text"
                  required
                  autoComplete="off"
                  className="px-5 flex-1 h-14 bg-body-2 rounded-lg text-white"
                />

                <Button>
                  <Search strokeWidth={iconSizes.normal} />
                </Button>
              </form>

              <p className="text-sm text-center mt-3">
                Animexflow.com - Just a better place to watch anime online for
                free!
              </p>

              <div className="flex flex-col items-center relative">
                <img
                  src={seikoAyase}
                  alt="Seiko Ayase from Dandadan"
                  className="w-[200px]"
                />
                <div className="absolute bottom-7">
                  <Button
                    rounded
                    accentColor
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    <span>Go to home page</span>
                    <CircleArrowRight strokeWidth={iconSizes.normal} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </MaxContainer>
      </header>
      <MaxContainer>
        <ul className="w-full max-w-[830px] mx-auto flex flex-col gap-5">
          {aboutUs.map((item) => (
            <li key={item.id} className="flex w-full flex-col gap-1.5">
              {item?.header && (
                <h2 className="text-4xl text-white">{item.header}</h2>
              )}
              {item?.text && <p>{item?.text}</p>}
              {item.list && (
                <ul className="flex flex-col w-full gap-1.5 list-disc pl-10">
                  {item.list.map((list) => (
                    <li key={list.id}>
                      <span className="font-semibold">{list.tab}</span>{" "}
                      {list.text}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </MaxContainer>
    </div>
  );
};

export default Home;
