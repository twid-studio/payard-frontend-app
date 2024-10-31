import React, { useRef } from "react";
import s from "./WhyPayard.module.scss";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const contentCard = [
  {
    title: "Secure Payments",
    text: "PaYard’s Visa cards keep your transactions safe with strong encryption, two-factor authentication, and ISO 27001 certified security. It’s all about making sure your money is protected, whether you're using fiat or digital currencies, so you can pay with confidence.",
  },
  {
    title: "Tailored to Your Needs",
    text: "Whether you’re a freelancer managing global payments or a business scaling internationally, PaYard adapts to your financial journey.",
  },
  {
    title: "No Surprises",
    text: "Planning an international transfer? Get transparent, upfront pricing, including a 0.2% transfer fee and clear fixed charges. You’ll always know exactly what you’re paying, so you can manage your finances without any unexpected costs.",
  },
  {
    title: "Personalized Support",
    text: "Get a dedicated manager and 24/7 multilingual support to ensure smooth, tailored financial management every step of the way.",
  },
];

export default function WhyPayard() {
  const cardsRef = useRef();
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["100% 100%", "100% 0%"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const filter = useTransform(scrollYProgress, [0.5, 1], ["blur(0vw)", "blur(1vw)"]);

  return (
    <section className={s.why} ref={cardsRef}>
      <Hero />
      <motion.div style={{ y, filter }} className={s.slides_wrapper}>
        {contentCard.map((currCard, i) => (
          <div className={s.slide} key={i}>
            <h1 className={"super-text second-tablet green " + s.title}>{currCard.title}</h1>
            <p className={s.text}>{currCard.text}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

const Hero = () => {
  const heroRef = useRef();

  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["0% 100%", "100% 0%"],
    layoutEffect: false,
  });

  // Spring physics for mouse movement
  const springConfig = { damping: 180, stiffness: 1500, mass: 0.1 };

  // Mouse movement transforms
  const plane1X = useSpring(positionX, springConfig);
  const plane1Y = useSpring(positionY, springConfig);

  const plane2X = useTransform(plane1X, (latest) => latest * 0.5);
  const plane2Y = useTransform(plane1Y, (latest) => latest * 0.5);

  const plane3X = useTransform(plane1X, (latest) => latest * 0.25);
  const plane3Y = useTransform(plane1Y, (latest) => latest * 0.25);

  // Scroll-based transforms using percentages
  const plane1ScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const plane2ScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const plane3ScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // Combine mouse and scroll movements
  const plane1CombinedY = useTransform(
    [plane1Y, plane1ScrollY],
    ([mouseY, scrollY]) => `calc(${mouseY}px + ${scrollY})`
  );

  const plane2CombinedY = useTransform(
    [plane2Y, plane2ScrollY],
    ([mouseY, scrollY]) => `calc(${mouseY}px + ${scrollY})`
  );

  const plane3CombinedY = useTransform(
    [plane3Y, plane3ScrollY],
    ([mouseY, scrollY]) => `calc(${mouseY}px + ${scrollY})`
  );

  const handleMouseMove = (event) => {
    const speed = 0.05;
    positionX.set(positionX.get() + event.movementX * speed);
    positionY.set(positionY.get() + event.movementY * speed);
  };

  const handleMouseLeave = () => {
    const speed = 0.05;
    positionX.set(0 + positionX.get() * speed);
    positionY.set(0 + positionY.get() * speed);
  };

  return (
    <div
      className={s.hero}
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h1 className={"super-text " + s.title}>Why Payard?</h1>
      <motion.div
        className={s.icon_wrapper}
        style={{
          x: plane1X,
          y: plane1CombinedY,
        }}
      >
        <div className={`${s.icon} ${s.icon_1}`}>
          <Image fill src={`/images/whyPayard/icons/icon-1.png`} alt="icon 1" />
        </div>
        <div className={`${s.icon} ${s.icon_3}`}>
          <Image fill src={`/images/whyPayard/icons/icon-3.png`} alt="icon 3" />
        </div>
      </motion.div>
      <motion.div
        className={s.icon_wrapper}
        style={{
          x: plane2X,
          y: plane2CombinedY,
        }}
      >
        <div className={`${s.icon} ${s.icon_2}`}>
          <Image fill src={`/images/whyPayard/icons/icon-2.png`} alt="icon 2" />
        </div>
        <div className={`${s.icon} ${s.icon_6}`}>
          <Image fill src={`/images/whyPayard/icons/icon-6.png`} alt="icon 6" />
        </div>
      </motion.div>
      <motion.div
        className={s.icon_wrapper}
        style={{
          x: plane3X,
          y: plane3CombinedY,
        }}
      >
        <div className={`${s.icon} ${s.icon_4}`}>
          <Image fill src={`/images/whyPayard/icons/icon-4.png`} alt="icon 4" />
        </div>
        <div className={`${s.icon} ${s.icon_5}`}>
          <Image fill src={`/images/whyPayard/icons/icon-5.png`} alt="icon 5" />
        </div>
      </motion.div>
    </div>
  );
};
