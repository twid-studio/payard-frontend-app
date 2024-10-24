import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";

export const PageLayout = ({ children, ...rest }) => {
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
        <Footer />
      </motion.div>
    </ScrollProvider>
  );
};
