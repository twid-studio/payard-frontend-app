import React, { useEffect } from "react";
import { PageLayout } from "@/utils/PageLayout/PageLayout";
import { Content } from "@/utils/Content/Content";
import { AnchorLink } from "@/utils/AnchorLink/AnchorLink";

import s from "./HomePage.module.scss";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import HeroHome from "./Hero/Hero";
import ServicesHome from "./Services/Services";
import PrivilegesHome from "./Privileges/Privileges";
import InstructionHome from "./Instruction/Instruction";
import PricingHome from "./Pricing/Pricing";
import WhyPayard from "./WhyPayard/WhyPayard";
import CTA from "./CTA/CTA";
import Consulting from "./Consulting/Consulting";
import UpcomingFeatures from "./UpcomingFeatures/UpcomingFeatures";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <PageLayout className={s.home}>
      <HeroHome />
      <ServicesHome />
      <PrivilegesHome />
      <InstructionHome />
      <PricingHome /> 
      <WhyPayard />
      <CTA />
      <Consulting />
      <UpcomingFeatures />
    </PageLayout>
    </>
  );
}

export default HomePage