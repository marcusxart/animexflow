import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import OutsideAlerter from "./OutsideAlerter";

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  placeholderLabel = "Select",
}) => {
  const [toggle, setToggle] = useState(false);

  const handleSelect = (option) => {
    onChange?.(option?.value);
    setToggle(false);
  };

  const selectedValue = options?.find((option) => option?.value === value);

  return (
    <OutsideAlerter handleClick={() => setToggle(false)}>
      <div className="relative inline-block text-left w-full min-w-40">
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={() => setToggle((prev) => !prev)}
          className="flex items-center justify-between w-full px-4 py-2 bg-body-2 rounded-md hover:bg-body-3 duration-100 transition-all cursor-pointer"
        >
          <span className="truncate">
            {selectedValue ? (
              <>
                {placeholderLabel}:{" "}
                <span className="text-white">{selectedValue.label}</span>
              </>
            ) : (
              placeholder
            )}
          </span>
          {toggle ? (
            <ChevronUp className="w-4 h-4 transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          )}
        </button>

        {/* Dropdown List */}
        <div
          className={`absolute left-0 mt-2 w-full bg-body-2 rounded-md shadow-md z-10 overflow-hidden transition-all duration-200 origin-top ${
            toggle
              ? "scale-y-100 opacity-100 pointer-events-auto"
              : "scale-y-0 opacity-0 pointer-events-none"
          }`}
        >
          <ul className="py-1 max-h-56 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-body-3 transition-all duration-100 `}
                >
                  <span>{option.label}</span>
                  {option.value === value && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 italic text-gray-400">No options</li>
            )}
          </ul>
        </div>
      </div>
    </OutsideAlerter>
  );
};

export default Dropdown;
