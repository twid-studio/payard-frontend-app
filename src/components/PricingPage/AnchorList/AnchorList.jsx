import { DataContext } from "@/lib/providers/DataProvider/context";
import { AnchorLink } from "@/utils/AnchorLink/AnchorLink";
import React, { useContext, useState, useEffect } from "react";

import s from "./AnchorList.module.scss";
import clsx from "clsx";
import { motion } from "framer-motion";
import { AnchorListAnim, anim, BlurTitleAnim } from "@/lib/helpers/anim";

export default function AnchorList({ blackTheme }) {
  const { data: allData } = useContext(DataContext);
  const data = allData.pricingTables;

  const [activeSection, setActiveSection] = useState(data[0].tableSlug);

  return (
    <motion.div
      {...anim(BlurTitleAnim)}
      className={clsx(s.anchor_link, {
        [s.anchor_link_black]: blackTheme,
      })}
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
              layoutId="highlight"
            />
          )}
          <span className={s.text}>{currentTable.tableTitle}</span>
        </AnchorLink>
      ))}
    </motion.div>
  );
}

export function FixedAnchorList({ blackTheme }) {
  const { data: allData } = useContext(DataContext);
  const data = allData.pricingTables;

  const [activeSection, setActiveSection] = useState(data[0].tableSlug);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    // Create an Intersection Observer to track sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When a section becomes visible
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      {
        // Adjust these values based on when you want the section to be considered "active"
        threshold: 0.2,
      }
    );
  
    // Observe all sections
    const observedElements = [];
    data.forEach((table) => {
      const element = document.getElementById(table.tableSlug);
      if (element) {
        observer.observe(element);
        observedElements.push(element);
      }
    });
  
    // Cleanup
    return () => {
      observedElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [data]);

  return (
    <motion.div
      {...anim(AnchorListAnim)}
      className={clsx(`${s.anchor_link} ${s.anchor_link_fixed}`, {
        [s.anchor_link_black]: blackTheme,
      })}
    >
      {data.map((currentTable, index) => (
        <AnchorLink
          toSection={`#${currentTable.tableSlug}`}
          key={index}
          className={clsx(s.link, {
            [s.link_active]:
              activeSection === currentTable.tableSlug ||
              hoveredSection === currentTable.tableSlug,
          })}
          // onMouseEnter={() => setHoveredSection(currentTable.tableSlug)}
          // onMouseLeave={() => setHoveredSection(null)}
        >
          {(activeSection === currentTable.tableSlug ||
            hoveredSection === currentTable.tableSlug) && (
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
