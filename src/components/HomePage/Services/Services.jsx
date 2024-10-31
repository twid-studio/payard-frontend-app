import React, { useRef } from "react";

import s from "./Services.module.scss";
import Image from "next/image";
import { Content } from "@/utils/Content/Content";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ButtonMain } from "@/utils/Button/Button";
import Link from "next/link";

const cards = [
  {
    type: "regular",
    icon: "/images/services/imgs/icon-1.png",
    title: "Starting Your Account",
    text: "You first steps are easy and hassle-free. Whether you're an individual or running a business, our simple setup process gets you up and running quickly. <br/><br/> Once you're in, you'll enjoy a range of benefits designed to make your financial life smoother",
    bg: "/images/services/imgs/bg-1.gif",
  },
  {
    type: "carousel",
    icon: "/images/services/imgs/icon-2.png",
    title: "Effortless Global Payments With the Flexibility You Need",
    text: "With our Visa cards, whether you choose a virtual or physical one, experience the flexibility to manage  finances your way, with global acceptance and robust protection.",
    carousel: ["Global <br /> Acceptance", "Robust <br /> Protection"],
  },
  {
    type: "regular",
    icon: "/images/services/imgs/icon-3.png",
    title: "Exchange currencies seamlessly, fast and hassle-free",
    text: "You first steps are easy and hassle-free. Whether you're an individual or running a business, our simple setup process gets you up and running quickly. <br/><br/> Once you're in, you'll enjoy a range of benefits designed to make your financial life smoother",
    bg: "/images/services/imgs/bg-3.gif",
  },
  {
    type: "fullBg",
    icon: "/images/services/imgs/icon-4.png",
    title: "Go global with streamlined transactions",
    text: "Payard supports seamless international transactions with SWIFT & SEPA, making global business and personal finances simple and efficient - all at competitive market rates.",
    bg: "/images/services/imgs/bg-4.mp4",
  },
];

export default function ServicesHome() {
  const servicesRef = useRef();

  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ["0% 100%", "95% 100%"],
    layoutEffect: false,
  });

  const scrollSpring = useSpring(scrollYProgress, { damping: 100, stiffness: 1000 })

  const clipPathStart = useTransform(
    scrollSpring,
    [0, 1],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 100%)"]
  );
  
  const clipPath = useTransform(
    scrollSpring,
    [0, 1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <section className={s.services} >
      <div className={s.title_wrapper}>
        <motion.div style={{ clipPath }} className={s.title}>
          <Image src="/images/services/title.svg" fill alt=""/>
        </motion.div>
        <motion.div style={{ clipPath: clipPathStart }} className={s.title}>
          <Image src="/images/services/title-start.svg" fill alt=""/>
        </motion.div>
      </div>
      <div className={s.cards_wrapper} ref={servicesRef}>
        {cards.map((currC, i) => {
          switch (currC.type) {
            case "regular":
              return <RegularCard content={currC} key={i} />;
            case "carousel":
              return <CarouselCard content={currC} key={i} />;
            case "fullBg":
              return <FullBgCard content={currC} key={i} />;
          }
        })}
      </div>
      <Link href="/" className={s.button}>
        <h2 className={s.buttonTitle}>Let’s Get Started</h2>
        <div className={s.buttonWrapper}>
          <ButtonMain link="/" text="Create Your Account" />
        </div>
      </Link>
    </section>
  );
}

const RegularCard = ({ content }) => {
  const { icon, title, text, bg } = content;
  return (
    <div className={`${s.card} ${s.regular}`}>
      <div className={s.top}>
        <Image src={icon} width={92} height={92} className={s.icon} alt=""/>
        <h2>{title}</h2>
      </div>
      <Content url={bg} className={s.background} />
      <p dangerouslySetInnerHTML={{ __html: text }} className={s.text} />
    </div>
  );
};

const FullBgCard = ({ content }) => {
  const { icon, title, text, bg } = content;
  return (
    <div className={`${s.card} ${s.fullBg}`}>
      <div className={s.top}>
        <Image src={icon} width={92} height={92} className={s.icon} alt=""/>
        <h2>{title}</h2>
      </div>
      <Content url={bg} className={s.background} />
      <p dangerouslySetInnerHTML={{ __html: text }} className={s.text} />
    </div>
  );
};

const CarouselCard = ({ content }) => {
  const { icon, title, text, carousel } = content;
  return (
    <div className={`${s.card} ${s.carousel}`}>
      <div className={s.left}>
        <div className={s.top}>
          <Image src={icon} width={92} height={92} className={s.icon} alt=""/>
          <h2>{title}</h2>
        </div>
        <p dangerouslySetInnerHTML={{ __html: text }} className={s.text} />
      </div>
      <div className={s.wrapper}>
        <div className={s.content}>
          {carousel.map((currT, i) => (
            <h2
              className={s.item}
              key={i}
              dangerouslySetInnerHTML={{ __html: currT }}
            />
          ))}
        </div>
        <div className={s.content}>
          {carousel.map((currT, i) => (
            <h2
              className={s.item}
              key={i}
              dangerouslySetInnerHTML={{ __html: currT }}
            />
          ))}
        </div>
        <div className={s.content}>
          {carousel.map((currT, i) => (
            <h2
              className={s.item}
              key={i}
              dangerouslySetInnerHTML={{ __html: currT }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
