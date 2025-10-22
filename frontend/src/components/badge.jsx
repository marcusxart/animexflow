import classNames from "classnames";

const Badge = ({ children, alt = false, className, rounded = false }) => {
  return (
    <div
      className={classNames(
        "grid place-items-center text-white  h-5 px-1.5  text-xs font-bold w-fit",
        {
          "bg-primary": !alt,
          "bg-secondary": alt,
        },
        { "rounded-sm": rounded },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
