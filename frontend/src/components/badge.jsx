import classNames from "classnames";

const Badge = ({ children, alt = false }) => {
  return (
    <div
      className={classNames(
        "grid place-items-center text-white  h-5 px-1.5  rounded-sm text-xs font-bold",
        {
          "bg-primary": !alt,
          "bg-secondary": alt,
        }
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
