import React, { useContext, useRef } from "react";

import s from "./Hero.module.scss";
import { ButtonBlack } from "@/utils/Button/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { anim, HeroCardPresence, TitleAnim } from "@/lib/helpers/anim";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function HeroHome() {
  
  const heroRef = useRef();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["0% 0%", "100% 0%"],
    layoutEffect: false,
  });

  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const titleBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0vw)", "blur(1vw)"]
  );

  return (
    <section className={s.hero} ref={heroRef}>
      <motion.h1
        style={{ scale: titleScale, filter: titleBlur }}
        className={`super-text ${s.title}`}
      >
        <Words text="Banking beyond borders," />
        <br />
        <Words classNames={`edgy ${s.op}`} index={1} text="made simple" />
      </motion.h1>
      <motion.div style={{ y: cardY, }} {...anim(HeroCardPresence)} className={s.open_account}>
        <p>Open Account</p>
        <Cards />
      </motion.div>
    </section>
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

const Cards = () => {
  const { data } = useContext(DataContext);

  return (
    <div className={s.cards_wrapper}>
      {data.heroCards.map((currC, i) => (
        <div className={s.card} key={i}>
          <h2 className={s.cardTitle}>{currC?.title}</h2>
          <div className={s?.popUp}>
            <p className={s.popUp_text}>{currC?.popUpText}</p>
            <ButtonBlack link="/" text="Create Your Account" />
          </div>
          <video
            loop
            muted
            autoPlay
            webkit-playsinline="true"
            playsInline
            className={s.video}
          >
            <source src={currC?.video} />
          </video>
        </div>
      ))}
    </div>
  );
};
