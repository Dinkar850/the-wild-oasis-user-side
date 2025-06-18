// "use client";

// import { useState } from "react";
// import Logo from "./Logo";

// function TextExpander({ children }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const displayText = isExpanded
//     ? children
//     : children.split(" ").slice(0, 40).join(" ") + "...";

//   return (
//     <span>
//       {displayText}{" "}
//       <button
//         className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         {isExpanded ? "Show less" : "Show more"}
//       </button>
//     </span>
//   );
// }

// export default TextExpander;
"use client";

import { useRef, useState, useLayoutEffect, useEffect } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("4.5rem");
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight("4.5rem");
      }
    }
  }, [isExpanded]);

  return (
    <span
      ref={contentRef}
      className={`inline-block overflow-hidden transition-[max-height] duration-500 align-top ${
        isExpanded ? "cursor-pointer" : ""
      }`}
      style={{ maxHeight }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <span className="inline">{children}</span>
    </span>
  );
}

export default TextExpander;
