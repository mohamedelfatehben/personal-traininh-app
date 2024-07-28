/* eslint-disable react/prop-types */
import { useState } from "react";
import {} from "react-icons/ti";

const Tooltip = ({ content, children, bottom }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    console.log("enter");
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {showTooltip && (
        <div
          className={`absolute z-10 bg-indigo-700 text-white p-2 rounded-md text-sm whitespace-no-wrap top-0 ${
            bottom && "top-full bg-indigo-400"
          } shadow left-0`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
