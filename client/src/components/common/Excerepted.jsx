/* eslint-disable react/prop-types */
import Tooltip from "./Tooltip";

const Excerpted = ({ length, text, bottom }) => {
  if (!text) return null;

  const excerpts = (text, length) => {
    if (typeof text !== "string") {
      text = "";
      length = 0;
    }
    if (length > text.length) return text;
    return text.slice(0, length) + " ...";
  };

  const excerptedText = excerpts(text, length);

  return (
    <Tooltip content={text} bottom={bottom}>
      <p className="m-0 p-0">{excerptedText}</p>
    </Tooltip>
  );
};

export default Excerpted;
