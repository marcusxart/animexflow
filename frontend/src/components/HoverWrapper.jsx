import { useState } from "react";

const HoverWrapper = ({ children, onHoverChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* Pass hover state to children if they’re a render function */}
      {typeof children === "function" ? children(isHovered) : children}
    </div>
  );
};

export default HoverWrapper;
