import React, { useContext, useRef } from "react";

import s from "./Services.module.scss";
import Image from "next/image";
import { Content } from "@/utils/Content/Content";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ButtonMain } from "@/utils/Button/Button";
import Link from "next/link";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function ServicesHome() {
  const { data } = useContext(DataContext);

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
    <section className={s.services} id="services">
      <div className={s.title_wrapper}>
        <motion.div style={{ clipPath }} className={s.title}>
          <Image src="/images/services/title-start.svg" fill alt=""/>
        </motion.div>
        <motion.div style={{ clipPath: clipPathStart }} className={s.title}>
          <Image src="/images/services/title.svg" fill alt=""/>
        </motion.div>
      </div>
      <div className={s.cards_wrapper} ref={servicesRef}>
        {data.services.cards.map((currC, i) => {
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
      <Link scroll={false} href={data.services.buttonGroup.buttonLink || "/"} className={s.button}>
        <h2 className={s.buttonTitle}>{data.services.buttonGroup.titleText}</h2>
        <div className={s.buttonWrapper}>
          <ButtonMain link={data.services.buttonGroup.buttonLink || "/"} text={data.services.buttonGroup.buttonText} />
        </div>
      </Link>
    </section>
  );
}

const RegularCard = ({ content }) => {
  return (
    <div className={`${s.card} ${s.regular}`}>
      <div className={s.top}>
        <Image src={content?.icon} width={92} height={92} className={s?.icon} alt=""/>
        <h2>{content?.title}</h2>
      </div>
      <Content url={content?.bg} className={s?.background} />
      <p dangerouslySetInnerHTML={{ __html: content?.text }} className={s?.text} />
    </div>
  );
};

const FullBgCard = ({ content }) => {
  return (
    <div className={`${s.card} ${s.fullBg}`}>
      <div className={s.top}>
        <Image src={content?.icon} width={92} height={92} className={s.icon} alt=""/>
        <h2>{content?.title}</h2>
      </div>
      <Content url={content?.bg} className={s.background} />
      <p dangerouslySetInnerHTML={{ __html: content?.text }} className={s.text} />
    </div>
  );
};

const CarouselCard = ({ content }) => {
  return (
    <div className={`${s.card} ${s.carousel}`}>
      <div className={s.left}>
        <div className={s.top}>
          <Image src={content?.icon} width={92} height={92} className={s.icon} alt=""/>
          <h2>{content?.title}</h2>
        </div>
        <p dangerouslySetInnerHTML={{ __html: content?.text }} className={s.text} />
      </div>
      <div className={s.wrapper}>
        <div className={s.content}>
          {content?.carousel.map((currT, i) => (
            <h2
              className={s.item}
              key={i}
              dangerouslySetInnerHTML={{ __html: currT }}
            />
          ))}
        </div>
        <div className={s.content}>
          {content?.carousel.map((currT, i) => (
            <h2
              className={s.item}
              key={i}
              dangerouslySetInnerHTML={{ __html: currT }}
            />
          ))}
        </div>
        <div className={s.content}>
          {content?.carousel.map((currT, i) => (
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
