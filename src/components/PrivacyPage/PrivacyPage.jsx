import { DataContext } from "@/lib/providers/DataProvider/context";
import { PageLayout } from "@/utils/PageLayout/PageLayout";
import SanityBlockContent from "@sanity/block-content-to-react";
import React, { useContext, useEffect } from "react";

import s from "./PrivacyPage.module.scss";
import { motion } from "framer-motion";
import { anim, HeroCardPresence, TitleAnim } from "@/lib/helpers/anim";
import { TitlePresence } from "@/utils/TitlePresence/TitlePresence";

export default function PrivacyPage() {
  const { data } = useContext(DataContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout className={s.privacy}>
      <div className={s.content}>
        <div className={s.title_wrapper}>
          <h1 className="super-text">
            <TitlePresence text={data.title} />
          </h1>
          <motion.p className="shadow" {...anim(TitleAnim)} custom={1}>
            {data.subTitle}
          </motion.p>
        </div>
        <motion.div 
          {...anim(HeroCardPresence)}
        className={s.body}>
          <SanityBlockContent
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            blocks={data.body}
            className={s.body_element}
          />
        </motion.div>
      </div>
    </PageLayout>
  );
}
