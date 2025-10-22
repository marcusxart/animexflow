import classNames from "classnames";

const Button = ({
  children,
  rounded = false,
  accentColor = false,
  circle = false,
  small = false,
  transparent = false,
  className,
  ...restProps
}) => {
  return (
    <button
      className={classNames(
        className,
        "flex items-center gap-2 font-medium duration-75 transition-colors  cursor-pointer text-btn-text hover:text-white whitespace-nowrap glass-btn",
        {
          "px-5": (rounded || !rounded) && !circle && !small,
          "rounded-4xl": rounded && !circle,
          "rounded-lg": !rounded && !circle,
          "rounded-full px-4": circle,
        },
        {
          "hover:bg-primary-btn-hover bg-primary-btn":
            !accentColor && !transparent,
          "bg-accent-btn hover:bg-accent-btn-hover":
            accentColor && !transparent,
        },
        {
          "h-12 px-4": small,
          "h-14": !small,
        }
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
