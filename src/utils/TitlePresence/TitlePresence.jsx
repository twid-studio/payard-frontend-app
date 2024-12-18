import { anim, TitleAnim } from "@/lib/helpers/anim";
import { motion } from "framer-motion";

export const TitlePresence = ({ text, classNames, index = 0 }) => {
  return text.split(" ").map((currWord, i) => (
    <motion.span
      key={i}
      className={`${classNames}`}
      {...anim(TitleAnim)}
      custom={i + index}
    >
      {currWord}&nbsp;
    </motion.span>
  ));
};
