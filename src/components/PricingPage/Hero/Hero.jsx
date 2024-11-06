import { anim, TitleAnim } from "@/lib/helpers/anim";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useContext, useRef } from "react";

import s from "./Hero.module.scss";
import clsx from "clsx";

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
        <Words text={data.title.split(" ")[0]} />
        <br />
        <Words text={data.title.split(" ").splice(1).join(" ")} index={1} />
      </motion.h1>
    </motion.section>
  );
}

const Words = ({ text, classNames, index = 0 }) => {
  return text.split(" ").map((currWord, i) => (
    <motion.span
      key={i}
      className={`${classNames}`}
      {...anim(TitleAnim)}
      custom={i + index}
    >
      {currWord}&nbsp;
    </motion.span>
  ));
};
