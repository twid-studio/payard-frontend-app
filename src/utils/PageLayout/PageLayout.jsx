import React from "react";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
import FormSection from "../Form/Form";

import s from "./PageLayout.module.scss";
import { anim, PagePresenceAnim } from "@/lib/helpers/anim";
import { ScrollBar } from "../ScrollBar/ScrollBar";

export const PageLayout = ({ children, ...rest }) => {
  return (
      <motion.div {...anim(PagePresenceAnim)} {...rest} style={{ willChange: "auto" }}>
        <ScrollBar />
        {children}
        <div className={s.page_bottom}>
          <span className={s.bg} />
          <FormSection />
          <Footer />
        </div>
      </motion.div>
  );
};
