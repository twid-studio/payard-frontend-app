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
import DeletionForm from "../DeletionForm/DeletionForm";
import clsx from "clsx";

export const PageLayout = ({ children, showForm = true, ...rest }) => {
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
          <div className={clsx(s.page_bottom, {
            [s.page_bottom_margin]: showForm
          })}>
            <span className={s.bg} />
            {showForm && <FormSection />}
            <Footer showedForm={showForm} />
          </div>
        </DataProvider>
      </motion.div>
    </ScrollProvider>
  );
};
