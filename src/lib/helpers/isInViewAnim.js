import { useMotionValueEvent, useScroll } from "framer-motion";
import {  useState } from "react";

const useIsViewAnim = ( ref ) => {
  const [isActive, setIsActive] = useState(false);

  const { scrollYProgress: presenceScroll } = useScroll({
    target: ref,
    offset: ["0% 80%", "100% 0%"],
    layoutEffect: false,
  });

  useMotionValueEvent(presenceScroll, "change", (latest) => {
    setIsActive(latest > 0);
  });

  return isActive
}

export default useIsViewAnim;