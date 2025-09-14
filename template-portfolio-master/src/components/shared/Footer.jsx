import { socials } from "@/constants";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex justify-between  text-3xl gap-7 w-[80%] mx-auto border-t border-dark-4 py-11 max-sm:pt-7  max-sm:justify-center max-sm:items-center whitespace-nowrap">
      <div className="">
        <div style={{ position: "relative", display: "inline-block" }}>
          <Link
            className="footer-link"
            to=""
            onClick={handleScrollToTop}
            onMouseEnter={(e) => {
              const tip = document.createElement("div");
              tip.textContent = "scroll to top";
              tip.className = "footer-tooltip";
              tip.style.position = "absolute";
              tip.style.bottom = "120%";
              tip.style.left = "50%";
              tip.style.transform = "translateX(-50%)";
              tip.style.background = "#222";
              tip.style.color = "#fff";
              tip.style.padding = "4px 10px";
              tip.style.borderRadius = "6px";
              tip.style.fontSize = "0.9rem";
              tip.style.whiteSpace = "nowrap";
              tip.style.zIndex = "100";
              tip.style.pointerEvents = "none";
              tip.style.opacity = "0.95";
              e.currentTarget.parentNode.appendChild(tip);
            }}
            onMouseLeave={(e) => {
              const tip =
                e.currentTarget.parentNode.querySelector(".footer-tooltip");
              if (tip) tip.remove();
            }}
          >
            ^ •
          </Link>
        </div>
        <Link className="footer-link" to={socials.github} target="_blank">
          {" "}
          github •
        </Link>
        <Link className="footer-link" to={socials.LinkedIn} target="_blank">
          {" "}
          LinkedIn •
        </Link>
      </div>
      <div className="max-sm:hidden">
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
