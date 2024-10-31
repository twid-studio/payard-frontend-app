import React, { useRef } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import FormSection from "../Form/Form";

import s from "./PageLayout.module.scss";

export const PageLayout = ({ children, ...rest }) => {
  const bottomRef = useRef();

  const { scrollYProgress } = useScroll({
    target: bottomRef,
    offset: ["0% 100%", "0% 0%"],
    layoutEffect: false,
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(80% 0% 0%)", "inset(0% 0% 0%)"]
  );

  return (
    <ScrollProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...rest}
      >
        <Header />
        {children}
        <div className={s.page_bottom} ref={bottomRef}>
          <motion.span style={{ clipPath }} className={s.bg} />
          <FormSection />
          <Footer />
        </div>
      </motion.div>
    </ScrollProvider>
  );
};
