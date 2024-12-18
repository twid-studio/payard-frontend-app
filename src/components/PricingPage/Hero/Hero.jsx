import { anim, TitleAnim } from "@/lib/helpers/anim";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useContext, useRef } from "react";

import s from "./Hero.module.scss";
import clsx from "clsx";
import { TitlePresence } from "@/utils/TitlePresence/TitlePresence";

export default function HeroPricing({ blackTheme }) {
  const { data } = useContext(DataContext);
  const heroRef = useRef();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["0% 0%", "100% 0%"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const filter = useTransform(
    scrollYProgress,
    [0.4, 1],
    ["blur(0vw)", "blur(0.5vw)"]
  );

  return (
    <motion.section
      style={{ y, scale, filter }}
      className={clsx(s.hero, {
        [s.hero_black]: blackTheme,
      })}
      ref={heroRef}
    >
      {data.validFrom && (
        <motion.p
          {...anim(TitleAnim)}
          className={"small-text shadow " + s.shadow}
        >
          Valid from {data.validFrom}
        </motion.p>
      )}
      <motion.h1 className="super-text">
        <TitlePresence text={data.title.split(" ")[0]} />
        <br />
        <TitlePresence text={data.title.split(" ").splice(1).join(" ")} index={1} />
      </motion.h1>
    </motion.section>
  );
}
