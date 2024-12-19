import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { ScrollBar } from "@/utils/ScrollBar/ScrollBar";
import { ScrollContext } from "./context";

export const useScrollLenis = () => useContext(ScrollContext);

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

const ScrollProviderContent = ({ children, scrollBar = true, wrapper }) => {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("lenis").then((LenisModule) => {
        const lenisInstance = new LenisModule.default({
          duration: 0.7,
          lerp: 0.1,
          smoothWheel: true,
          wheelMultiplier: 2,
          wrapper: wrapper ? document.querySelector(wrapper) : window,
        });

        setLenis(lenisInstance);

        function raf(time) {
          lenisInstance.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);

        return () => {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
          lenisInstance.destroy();
        };
      });
    }
  }, []);

  const scrollTo = (target) => {
    if (lenis) {
      const dynamicOffset = window.innerHeight * 0.16; // 10% of viewport height
      lenis.scrollTo(target, {
        duration: 2,
        offset: -dynamicOffset,
        easing: (x) => easeInOutExpo(x),
      });
    }
  };

  const rangeScrollTo = (progress) => {
    if (lenis) {
      lenis.scrollTo(progress, {
        duration: 1.5,
      });
    }
  };

  const scrollStop = () => {
    if (lenis) {
      lenis.stop();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }
  };

  const scrollResume = () => {
    if (lenis) {
      lenis.start();
      function raf(time) {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      }
      rafRef.current = requestAnimationFrame(raf);
    }
  };

  return (
    <ScrollContext.Provider
      value={{ scrollTo, rangeScrollTo, scrollStop, scrollResume }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const ScrollProvider = dynamic(
  () => Promise.resolve(ScrollProviderContent),
  {
    ssr: false,
  }
);
