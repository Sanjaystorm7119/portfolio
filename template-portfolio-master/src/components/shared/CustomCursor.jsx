import { useEffect, useState } from "react";
import "../../index.css"; // Ensure your CSS is imported

const CustomCursor = () => {
  const [cursorClass, setCursorClass] = useState("default-cursor");
  const [isHighlight, setIsHighlight] = useState(false);
  const [cursorStyle, setCursorStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Adjust this width as needed
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      return; // Do not apply custom cursor on mobile devices
    }

    const cursor = document.querySelector(".custom-cursor");

    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e) => {
      const element = e.target;
      // Highlight when hovering over the name heading
      if (element.classList.contains("magnetic-name")) {
        setIsHighlight(true);
        setCursorClass("highlight-cursor");
      } else if (element.classList.contains("footer-link")) {
        const rect = element.getBoundingClientRect();
        setCursorStyle({
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          borderRadius: "0",
        });
        setCursorClass("footer-link-cursor");
      } else if (element.tagName === "P") {
        setCursorClass("text-cursor");
      } else if (element.tagName === "H1") {
        setCursorClass("text-cursor2");
      } else if (element.tagName === "BUTTON") {
        setCursorClass("button-cursor");
      } else {
        setCursorClass("default-cursor");
        setCursorStyle({});
        setIsHighlight(false);
      }
    };

    const handleMouseOut = () => {
      setCursorClass("default-cursor");
      setCursorStyle({});
      setIsHighlight(false);
    };

    const throttleMouseMove = (e) => {
      requestAnimationFrame(() => handleMouseMove(e));
    };

    document.addEventListener("mousemove", throttleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", throttleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile]);

  if (isMobile) {
    return null; // Do not render the custom cursor on mobile devices
  }

  return (
    <div
      className={`custom-cursor spinning-cursor ${cursorClass}${
        isHighlight ? " highlight-cursor" : ""
      }`}
      style={cursorStyle}
    >
      {/* Dot in center */}
      <div className="cursor-dot"></div>
      {/* Highlight corners if active */}
      {isHighlight && (
        <>
          <div className="cursor-corner tl"></div>
          <div className="cursor-corner tr"></div>
          <div className="cursor-corner bl"></div>
          <div className="cursor-corner br"></div>
        </>
      )}
    </div>
  );
};

export default CustomCursor;
