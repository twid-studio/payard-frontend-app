import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import FormSection from "../Form/Form";

import s from "./PageLayout.module.scss";
import { anim, PagePresenceAnim } from "@/lib/helpers/anim";

export const PageLayout = ({ children, ...rest }) => {
  return (
    <ScrollProvider>
      <motion.div {...anim(PagePresenceAnim)} {...rest}>
        {children}
        <div className={s.page_bottom}>
          <span className={s.bg} />
          <FormSection />
          <Footer />
        </div>
      </motion.div>
    </ScrollProvider>
  );
};
