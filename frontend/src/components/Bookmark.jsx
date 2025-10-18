import { Heart } from "lucide-react";
import { iconSizes } from "../utils/constants";
import { useEffect, useState } from "react";
import Button from "./Button";

const Bookmark = ({ defaultValue = false, onChnage }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChnage?.(value);
  }, [value]);

  return (
    <Button
      circle
      accentColor
      transparent
      onClick={() => {
        setValue((prev) => !prev);
      }}
    >
      <Heart
        className="text-red-600"
        strokeWidth={iconSizes.normal}
        fill={value ? "#EF4444" : "transparent"}
      />

      {value ? "Added" : "Add to favorites"}
    </Button>
  );
};

export default Bookmark;
