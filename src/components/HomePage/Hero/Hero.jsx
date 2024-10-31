import React, { useRef } from "react";

import s from "./Hero.module.scss";
import { ButtonBlack } from "@/utils/Button/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { anim, TitleAnim } from "@/lib/helpers/anim";

export default function HeroHome() {
  const heroRef = useRef();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["0% 0%", "100% 0%"],
    layoutEffect: false
  });

  const cardY = useTransform(scrollYProgress, [0,1], ["0%", "-30%"]);

  return (
    <section className={s.hero} ref={heroRef}>
      <h1 className={`super-text ${s.title}`}>
        Banking beyond borders,
        <br />
        <span className={`edgy ${s.op}`}>made simple</span>
      </h1>
      <motion.div style={{ y: cardY }} className={s.open_account}>
        <p>Open Account</p>
        <Cards />
      </motion.div>
    </section>
  );
}

const Cards = () => {
  const content = [
    {
      title: "For business",
      popUpText:
        "Empower your business with a PaYard account, offering swift onboarding and global transaction capabilities within 3 days or less",
      video: "/images/hero/1.mp4",
    },
    {
      title: "For persons",
      popUpText:
        "For you, worldwide. Open personal account in just 30 minutes with seamless virtual setup, and let your money work.",
      video: "/images/hero/2.mp4",
    },
  ];

  return (
    <div className={s.cards_wrapper}>
      {content.map((currC, i) => (
        <div className={s.card} key={i}>
          <h2>{currC.title}</h2>
          <div className={s.popUp}>
            <p className={s.popUp_text}>{currC.popUpText}</p>
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
            <source src={currC.video} />
          </video>
        </div>
      ))}
    </div>
  );
};
