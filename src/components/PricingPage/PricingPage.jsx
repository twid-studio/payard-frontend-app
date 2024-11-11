import React, { useEffect, useState } from "react";
import HeroPricing from "./Hero/Hero";
import TablePricing from "./Table/Table";
import { PageLayout } from "@/utils/PageLayout/PageLayout";

import s from "./PricingPage.module.scss";
import AnchorList, { FixedAnchorList } from "./AnchorList/AnchorList";
import { AnimatePresence } from "framer-motion";
import clsx from "clsx";
import ButtonPricing from "./Button/Button";

export default function PricingPage({ theme = "white", type = "personal" }) {
  const [isFixedList, setIsFixedList] = useState(false);

  const blackTheme = theme === "black"

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout
      className={clsx(s.pricing_page, {
        [s.pricing_page_black]: blackTheme,
      })}
    >
      <HeroPricing blackTheme={blackTheme} />
      <AnchorList blackTheme={blackTheme} />
      <AnimatePresence mode="wait">
        {isFixedList && <FixedAnchorList blackTheme={blackTheme} />}
      </AnimatePresence>
      <TablePricing
        setIsFixedList={setIsFixedList}
        blackTheme={blackTheme}
      />
      <ButtonPricing
        blackTheme={blackTheme}
        type={type}
      />
    </PageLayout>
  );
}
