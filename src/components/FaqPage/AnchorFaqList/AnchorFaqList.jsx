import { DataContext } from "@/lib/providers/DataProvider/context";
import { AnchorLink } from "@/utils/AnchorLink/AnchorLink";
import React, { useContext, useState, useEffect, useRef } from "react";

import s from "./AnchorFaqList.module.scss";
import clsx from "clsx";
import { motion } from "framer-motion";
import { AnchorListAnim, anim, BlurTitleAnim } from "@/lib/helpers/anim";

export default function AnchorFaqList({ data }) {
  const [activeSection, setActiveSection] = useState(data[0]?.sectionslug);

  return (
    data && (
      <motion.div {...anim(BlurTitleAnim)} className={s.anchor_link}>
        <div className={s.scrollWrapper}>
          {data?.map((currentTable, index) =>  currentTable?.sectionTitle && (
            <AnchorLink
              toSection={`#${currentTable?.sectionslug}`}
              key={index}
              className={clsx(s.link, {
                [s.link_active]: activeSection === currentTable?.sectionslug,
              })}
              onMouseEnter={() => setActiveSection(currentTable?.sectionslug)}
              onMouseLeave={() => setActiveSection(activeSection)}
            >
              {activeSection === currentTable?.sectionslug && (
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
              <span className={s.text}>{currentTable?.sectionTitle}</span>
            </AnchorLink>
          ))}
        </div>
      </motion.div>
    )
  );
}

export function FixedAnchorFaqList({ data }) {
  const [activeSection, setActiveSection] = useState(data[0]?.sectionslug);
  const [hoveredSection, setHoveredSection] = useState(null);

  const scrollWrapper = useRef();

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
        threshold: 0.5,
        }
    );

    // Observe all sections
    const observedElements = [];
    data?.forEach((table) => {
      const element = document.getElementById(table?.sectionslug);
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

  useEffect(() => {
    const element = document.getElementById(`${activeSection}__link`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeSection, scrollWrapper]);

  return (
    <motion.div
      {...anim(AnchorListAnim)}
      className={clsx(`${s.anchor_link} ${s.anchor_link_fixed}`, {})}
    >
      <div className={s.scrollWrapper} ref={scrollWrapper}>
        {data?.map((currentTable, index) => currentTable?.sectionTitle && (
          <AnchorLink
            toSection={`#${currentTable?.sectionslug}`}
            key={index}
            className={clsx(s.link, {
              [s.link_active]:
                activeSection === currentTable?.sectionslug ||
                hoveredSection === currentTable?.sectionslug,
            })}
            // onMouseEnter={() => setHoveredSection(currentTable?.sectionslug)}
            // onMouseLeave={() => setHoveredSection(null)}
          >
            {(activeSection === currentTable?.sectionslug ||
              hoveredSection === currentTable?.sectionslug) && (
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
            <span className={s.text} id={`${currentTable?.sectionslug}__link`}>{currentTable?.sectionTitle}</span>
          </AnchorLink>
        ))}
      </div>
    </motion.div>
  );
}