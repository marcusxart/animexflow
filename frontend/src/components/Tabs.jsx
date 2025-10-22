import classNames from "classnames";

const Tabs = ({ value, options = [], onChange }) => {
  return (
    <ul className="flex shrink-0 items-center gap-1.5">
      {options?.map((item) => (
        <li
          key={item?.value}
          onClick={() => {
            onChange?.(item?.value);
          }}
          className={classNames(
            "text-sm font-medium transition-all duration-250 opacity-70 hover:opacity-100 cursor-pointer",
            {
              "text-white opacity-100": value === item?.value,
            }
          )}
        >
          {item?.label}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
