import React, { useRef, useState } from "react";

import s from "./FaqSection.module.scss";
import { FaqItem } from "../FaqItem/FaqItem";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { anim, HeroCardPresence } from "@/lib/helpers/anim";

export default function FaqSection({ data }) {
  const [activeItem, setActiveItem] = useState(null);

  return data.map((section, index) => (
    <motion.section
      {...anim(HeroCardPresence)}
      key={index}
      className={s.section}
    >
      <Title
        color={section?.color}
        title={section?.sectionTitle}
        id={section?.sectionslug}
      />
      <div className={s.section_content}>
        {section.list.map((currentItem, i) => (
          <FaqItem
            title={currentItem.title}
            body={currentItem.body}
            key={`${index}_${i}`}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            index={`${index}_${i}`}
          />
        ))}
      </div>
    </motion.section>
  ));
}

const Title = ({ title, id, color }) => {
  return (
    <h3 className={s.section_title} style={{ backgroundColor: color }} id={id}>
      {title}
    </h3>
  );
};
