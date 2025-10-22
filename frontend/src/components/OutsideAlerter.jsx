import { useRef, useEffect } from "react";

function useOutsideAlerter(ref, onClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick && onClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter({ children, handleClick }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClick);

  return <div ref={wrapperRef}>{children}</div>;
}
