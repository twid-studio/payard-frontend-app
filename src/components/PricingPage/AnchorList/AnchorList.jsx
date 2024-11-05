import { DataContext } from "@/lib/providers/DataProvider/context";
import { AnchorLink } from "@/utils/AnchorLink/AnchorLink";
import React, { useContext, useState, useEffect } from "react";

import s from "./AnchorList.module.scss";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  AnchorListAnim,
  anim,
  BlurTitleAnim,
  inViewAnim,
} from "@/lib/helpers/anim";

export default function AnchorList() {
  const { data: allData } = useContext(DataContext);
  const data = allData.pricingPersonalTables;

  const [activeSection, setActiveSection] = useState(data[0].tableSlug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.5 }
    );

    const sections = document.querySelectorAll("[id^='#']");
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div {...anim(BlurTitleAnim)} className={s.anchor_link}>
      {data.map((currentTable, index) => (
        <AnchorLink
          toSection={`#${currentTable.tableSlug}`}
          key={index}
          className={clsx(s.link, {
            [s.link_active]: activeSection === currentTable.tableSlug,
          })}
          onMouseEnter={() => setActiveSection(currentTable.tableSlug)}
          onMouseLeave={() => setActiveSection(activeSection)}
        >
          {activeSection === currentTable.tableSlug && (
            <motion.span
              transition={{
                layout: {
                  duration: 0.4,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              className={s.highlight}
              layoutId="highlight"
            />
          )}
          <span className={s.text}>{currentTable.tableTitle}</span>
        </AnchorLink>
      ))}
    </motion.div>
  );
}

export function FixedAnchorList() {
  const { data: allData } = useContext(DataContext);
  const data = allData.pricingPersonalTables;

  const [activeSection, setActiveSection] = useState(data[0].tableSlug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.5 }
    );

    const sections = document.querySelectorAll("[id^='#']");
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      {...anim(AnchorListAnim)}
      className={`${s.anchor_link} ${s.anchor_link_fixed}`}
    >
      {data.map((currentTable, index) => (
        <AnchorLink
          toSection={`#${currentTable.tableSlug}`}
          key={index}
          className={clsx(s.link, {
            [s.link_active]: activeSection === currentTable.tableSlug,
          })}
          onMouseEnter={() => setActiveSection(currentTable.tableSlug)}
          onMouseLeave={() => setActiveSection(activeSection)}
        >
          {activeSection === currentTable.tableSlug && (
            <motion.span
              transition={{
                layout: {
                  duration: 0.4,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              className={s.highlight}
              layoutId="highlightFixed"
            />
          )}
          <span className={s.text}>{currentTable.tableTitle}</span>
        </AnchorLink>
      ))}
    </motion.div>
  );
}
