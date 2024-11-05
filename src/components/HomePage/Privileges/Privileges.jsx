import React, { useContext, useRef } from "react";

import s from "./Privileges.module.scss";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Paragraph } from "@/utils/ParagraphAnim/ParagraphAnim";
import { DataContext } from "@/lib/providers/DataProvider/context";

export default function PrivilegesHome() {
  const privilegesRef = useRef();
  const { data } = useContext(DataContext);

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
      >
        <Paragraph paragraph={["Fast. Safe.", "Always on."]} />
      </motion.h1>

      <ul className={s.list}>
        {data.privileges.map((currI, i) => (
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
