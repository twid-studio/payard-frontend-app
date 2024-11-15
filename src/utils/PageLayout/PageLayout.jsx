import React from "react";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
import FormSection from "../Form/Form";

import s from "./PageLayout.module.scss";
import { anim, PagePresenceAnim } from "@/lib/helpers/anim";
import { ScrollBar } from "../ScrollBar/ScrollBar";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import Header from "../Header/Header";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { URL_FOOTER } from "@/lib/helpers/DataUrls";

export const PageLayout = ({ children, ...rest }) => {
  return (
    <ScrollProvider>
      <Header />
      <motion.div
        {...anim(PagePresenceAnim)}
        {...rest}
        style={{ willChange: "auto" }}
      >
        <ScrollBar />
        {children}
        <DataProvider url={URL_FOOTER}>
          <div className={s.page_bottom}>
            <span className={s.bg} />
            <FormSection />
            <Footer />
          </div>
        </DataProvider>
      </motion.div>
    </ScrollProvider>
  );
};
