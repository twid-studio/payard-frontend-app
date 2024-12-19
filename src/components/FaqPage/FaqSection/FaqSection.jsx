import React, { useRef, useState } from "react";

import s from "./FaqSection.module.scss";
import { FaqItem } from "../FaqItem/FaqItem";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { anim, HeroCardPresence } from "@/lib/helpers/anim";

export default function FaqSection({ data, setIsFixed }) {
  const [activeItem, setActiveItem] = useState(null);

  const sectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0% 0%", "100% 70%"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsFixed(latest > 0 && latest !== 1);
  });

  return (
    <main ref={sectionRef}>
      {data.map((section, index) => (
        <motion.section
          {...anim(HeroCardPresence)}
          key={`${section?.sectionTitle}__${index}`}
          className={s.section}
          id={section?.sectionslug}
        >
          <Title color={section?.color} title={section?.sectionTitle} />
          <div className={s.section_content}>
            {section.list.map((currentItem, i) => (
              <FaqItem
                title={currentItem.title}
                body={currentItem.body}
                key={`${section?.sectionTitle}__${index}_${i}`}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                index={`${index}_${i}`}
              />
            ))}
          </div>
        </motion.section>
      ))}
    </main>
  );
}

const Title = ({ title, id, color }) => {
  return (
    <h3 className={s.section_title} style={{ backgroundColor: color }}>
      {title}
    </h3>
  );
};
