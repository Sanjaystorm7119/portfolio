"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Modal, ModalTrigger } from "../ui/animated-modal";
import ModalForm from "../shared/ModalForm";
import AnimatedShinyText from "./animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { name, theme } from "@/constants";

export const TextRevealByWord = ({ text, className }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  const buttonOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const buttonX = useTransform(scrollYProgress, [0.8, 1], [250, 0]);

  // Magnetic cursor state
  const magneticRef = useRef(null);
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!magneticRef.current) return;
      const rect = magneticRef.current.getBoundingClientRect();
      const mx = e.clientX;
      const my = e.clientY;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(mx - cx, my - cy);
      // Only magnetic if within 120px
      if (dist < 120) {
        setIsNear(true);
        // Move max 30px toward cursor
        const angle = Math.atan2(my - cy, mx - cx);
        const mag = Math.min(30, 120 - dist);
        setMagnetic({
          x: Math.cos(angle) * mag,
          y: Math.sin(angle) * mag,
        });
      } else {
        setIsNear(false);
        setMagnetic({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={targetRef}
      className={cn(
        "relative z-50 min-h-[195vh] max-sm:min-h-[168vh] ",
        className
      )}
      style={{
        "--color": theme,
      }}
    >
      <div
        className={
          "sticky top-5 max-sm:top-10 mx-auto flex flex-col h-[81%] max-w-5xl bg-transparent md:px-[1rem] py-[7rem]"
        }
      >
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="inline-block text-6xl max-md:text-3xl">I'm</h1>
          <motion.h1
            ref={magneticRef}
            className={`magnetic-name text-9xl max-xl:text-8xl max-sm:text-7xl [color:var(--color)]`}
            animate={{
              x: magnetic.x,
              y: magnetic.y,
              scale: isNear ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {name}
          </motion.h1>
          <h1
            className={` text-9xl max-xl:text-8xl max-sm:text-7xl [color:var(--color)]`}
          >
            -!Just a dev
          </h1>
        </div>
        <p
          className={
            "flex flex-wrap p-5 lg:w-[750px] text-2xl text-transparent md:p-8 sm:text-3xl md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
        <div className="flex items-center px-5 justify-start">
          <Modal>
            <motion.button
              style={{ opacity: buttonOpacity, x: buttonX }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className=""
            >
              <ModalTrigger className="group/modal-btn   cursor-none  p-0">
                <div className="z-10 flexitems-center justify-center">
                  <div
                    className={cn(
                      "group rounded-full text-base text-white transition-all ease-in border border-zinc-600/70 hover:cursor-pointer  bg-neutral-950 hover:bg-neutral-800"
                    )}
                  >
                    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-4 transition ease-out hover:[color:var(--color)] hover:duration-300 lg:text-3xl md:text-2xl">
                      <button>👋 Say hi!</button>
                      <ArrowRightIcon className="ml-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                  </div>
                </div>
              </ModalTrigger>
            </motion.button>
            <ModalForm />
          </Modal>
        </div>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <p className={"absolute opacity-30"}>{children}</p>
      <motion.span style={{ opacity: opacity }} className={"text-white"}>
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
