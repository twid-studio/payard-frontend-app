import React, { useRef } from "react";

import s from "./Privileges.module.scss";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import isInViewAnim from "@/lib/helpers/isInViewAnim";
import { Paragraph } from "@/utils/ParagraphAnim/ParagraphAnim";

const list = [
  {
    title: "PCI DSS Certified",
    icon: "/images/privileges/icons/icon-1.png",
    text: "Our servers meet global security standards, ensuring top-tier protection for your data.",
  },
  {
    title: "24/7 Monitoring",
    icon: "/images/privileges/icons/icon-2.png",
    text: "We keep an eye on your transactions around the clock, ensuring smooth operations and better conversion rates.",
  },
  {
    title: "Anti-Fraud Protection",
    icon: "/images/privileges/icons/icon-3.png",
    text: "PayPlanets anti-fraud system filters out fraudulent activities, keeping your payments secure.",
  },
  {
    title: "Chargeback Prevention",
    icon: "/images/privileges/icons/icon-4.png",
    text: "Automated chargeback protection reduces risks and keeps penalties at bay, making your business safer.",
  },
];

export default function PrivilegesHome() {
  const privilegesRef = useRef();
  const isInView = isInViewAnim(privilegesRef);

  const { scrollYProgress } = useScroll({
    target: privilegesRef,
    offset: ["100% 0%", "0% 100%"],
    layoutEffect: false,
  });

  const scrollSpring = useSpring(scrollYProgress, {
    damping: 100,
    stiffness: 1000,
  });

  const bgPosition = useTransform(scrollSpring, [0, 1], ["0%", "200%"]);

  return (
    <motion.section
      style={{ backgroundPositionY: bgPosition }}
      className={s.privileges}
      ref={privilegesRef}
    >
      <motion.h1
        className={s.title}
        // {...inViewAnim(BlurTitleAnim, isInView)}
      >
        <Paragraph paragraph={["Fast. Safe.", "Always on."]} />
      </motion.h1>

      <ul className={s.list}>
        {list.map((currI, i) => (
          <li key={i} className={s.item}>
            <div className={s.top}>
              <Image
                className={s.icon}
                src={currI.icon}
                width={50}
                height={50}
                alt=""
              />
              <h2>{currI.title}</h2>
            </div>
            <h3 className={s.text}>{currI.text}</h3>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
