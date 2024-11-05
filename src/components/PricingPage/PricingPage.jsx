import React, { useState } from 'react'
import HeroPricing from './Hero/Hero';
import TablePricing from './Table/Table';
import { PageLayout } from '@/utils/PageLayout/PageLayout';

import s from "./PricingPage.module.scss";
import AnchorList, { FixedAnchorList } from './AnchorList/AnchorList';
import { AnimatePresence } from 'framer-motion';

export default function PricingPage({ theme = "white" }) {
  const [isFixedList, setIsFixedList] = useState(false);

  return (
    <PageLayout className={s.pricing_page}>
      <HeroPricing />
      <AnchorList />
      <AnimatePresence mode="wait">
        {isFixedList && (<FixedAnchorList />)}
      </AnimatePresence>
      <TablePricing setIsFixedList={setIsFixedList}/>
    </PageLayout>
  )
}
