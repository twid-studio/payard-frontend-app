import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import s from "./ParagraphAnim.module.scss"

export const Paragraph = ({ paragraph, classNames = "" }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["0% 75%", "0% 15%"],
  });

  // Calculate total words across all paragraphs
  const totalWords = paragraph.reduce(
    (acc, para) => acc + para.split(" ").length,
    0
  );
  let wordIndex = 0;

  return (
    <div className={`${s.paragraphWrapper} ${classNames}`} ref={container}>
      {paragraph.map((para, paraIndex) => {
        const words = para.split(" ");

        const paragraphJsx = words.map((word, i) => {
          const start = wordIndex / (totalWords + 7) - 0.1;
          const end = wordIndex / (totalWords + 7) + 0.1;
          wordIndex++;

          return (
            <Word
              key={`${paraIndex}-${i}`}
              progress={scrollYProgress}
              range={[start, end]}
            >
              {word}
            </Word>
          );
        });

        return (
          <p key={paraIndex} className={s.paragraph}>
            {paragraphJsx}
          </p>
        );
      })}
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const progressSpring = useSpring(progress, {
    damping: 500,
    stiffness: 1500,
    duration: 0.4,
    // mass: 1
  });
  const opacity = useTransform(progressSpring, range, [0, 1]);
  const filter = useTransform(progressSpring, range, [
    "blur(.2vw)",
    "blur(0vw)",
  ]);

  return (
    <motion.span className={s.word}>
      <span className={s.shadow} dangerouslySetInnerHTML={{ __html: children }} />
      <motion.span style={{ opacity, filter }} dangerouslySetInnerHTML={{ __html: children }} />
    </motion.span>
  );
};
