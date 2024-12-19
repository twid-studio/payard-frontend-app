import { DataContext } from "@/lib/providers/DataProvider/context";
import { PageLayout } from "@/utils/PageLayout/PageLayout";
import React, { useContext, useEffect, useRef, useState } from "react";

import s from "./FaqPage.module.scss";
import { TitlePresence } from "@/utils/TitlePresence/TitlePresence";
import FaqSection from "./FaqSection/FaqSection";
import ButtonsSection from "./ButtonsSection/ButtonsSection";
import AnchorFaqList from "./AnchorFaqList/AnchorFaqList";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { FixedAnchorFaqList } from "./AnchorFaqList/AnchorFaqList";

export default function FaqPage() {
  const [isFixed, setIsFixed] = useState(false);
  const { data } = useContext(DataContext);

  return (
    <PageLayout className={s.faqPage}>
      <div className={s.title}>
        <h1 className="super-text">
          <TitlePresence text={data.title} />
        </h1>
      </div>
      <AnimatePresence mode="wait">
        {isFixed && <FixedAnchorFaqList data={data.faqSections} />}
      </AnimatePresence>
      <AnchorFaqList data={data.faqSections} />
      <FaqSection data={data.faqSections} setIsFixed={setIsFixed} />
      <ButtonsSection data={data.buttons} />
    </PageLayout>
  );
}
