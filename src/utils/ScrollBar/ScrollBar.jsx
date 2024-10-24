import { useScroll, useSpring, motion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import s from "./ScrollBar.module.scss";
import { useScrollLenis } from "@/lib/providers/ScrollProvider/ScrollProvider";

export const ScrollBar = ({}) => {
  const [rangeValue, setRangeValue] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 100,
  });
  const y = useTransform(scrollSpring, [0, 1], ["0%", "-100%"]);
  const top = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);

  const { rangeScrollTo } = useScrollLenis();

  useEffect(() => {
    setIsMounted(true);
    setDocumentHeight(
      document.documentElement.scrollHeight - window.innerHeight
    );
  }, []);

  const handleRangeChange = (e) => {
    const value = e.target.value;
    setRangeValue(value);
    const scrollTo = (documentHeight * value) / 100;
    rangeScrollTo(scrollTo);
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setRangeValue(v * 100);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <div className={s.progressBar} data-desktop-element>
      <motion.div className={s.progressBar__bar} style={{ top, y }} />
      <input
        type="range"
        min="0"
        max="100"
        value={rangeValue}
        onChange={handleRangeChange}
        className={s.progressBar__range}
      />
    </div>
  );
};
