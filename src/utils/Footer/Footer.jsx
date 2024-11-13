import React, { useContext } from "react";
import { Logo } from "../Logo/Logo";

import s from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AnchorLink } from "../AnchorLink/AnchorLink";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { URL_FOOTER } from "@/lib/helpers/DataUrls";
import { DataContext } from "@/lib/providers/DataProvider/context";

const linksList = {
  anchor: [
    {
      text: "Banking",
      link: "#banking",
    },
    {
      text: "Services",
      link: "#services",
    },
    {
      text: "Consulting",
      link: "#consulting",
    },
  ],
  terms: [
    {
      text: "Fees & Commissions",
      link: "/",
    },
    {
      text: "Terms & Conditions",
      link: "/privacy/terms-and-conditions",
    },
    {
      text: "Privacy Policy",
      link: "/privacy/privacy-policy",
    },
  ],
  pricing: [
    {
      text: "For Business Account",
      link: "/pricing/business",
    },
    {
      text: "For Personal Account",
      link: "/pricing/personal",
    },
  ],
};

export default function Footer() {
  return (
    <DataProvider url={URL_FOOTER}>
      <FooterBody />
    </DataProvider>
  );
}

function FooterBody() {
  const { data } = useContext(DataContext);

  const adress = data.adress;
  const bottom = data.bottom;

  const p = [
    {
      title: "More Info",
      list: data.moreInfoList
    },
    {
      title: "Terms",
      list: data.termsList
    },
    {
      title: "Pricing",
      list: data.pricingList
    },
  ]

  return (
    <footer className={s.footer}>
      <div className={"grid " + s.top}>
        <Link
          scroll={false}
          href={adress.link}
          target="_blank"
          className={"bold text-hover " + s.adress}
        >
          <p>{adress.title}</p>
          <p>{adress.text}</p>
        </Link>

        {p.map((currList, wrapperIndex) => (
          <div className={s.list} key={wrapperIndex}>
            <p className={"bold " + s.list_title}>{currList.title}</p>
            {currList.list.map((curr, i) => (
              <>
                {curr.type === "anchor" ? (
                  <AnchorLink
                    toSection={curr.link.slug}
                    page="/"
                    key={i}
                    className="small-text text-hover"
                  >
                    {curr.link.title}
                  </AnchorLink>
                ) : (
                  <Link
                    key={i}
                    href={curr.link.slug}
                    className="small-text text-hover"
                    scroll={false}
                  >
                    {curr.link.title}
                  </Link>
                )}
              </>
            ))}
          </div>
        ))}
      </div>
      <div className={s.logo}>
        <Image src="/images/footer/logo.svg" fill alt="" />
      </div>
      <div className={"grid " + s.bottom}>
        <p className="shadow small-text second-mobile second-tablet">
          {bottom.copyright}
        </p>
        <p
          className={
            "shadow small-text second-mobile second-tablet " + s.trademark
          }
        >
          {bottom.trademark[0]}
          <br />
          {bottom.trademark[1]}
        </p>
        <Link
          scroll={false}
          href={bottom.createdBy.slug}
          target="_blank"
          className={
            "shadow text-hover small-text second-mobile second-tablet " + s.link
          }
        >
          {bottom.createdBy.title}
        </Link>
      </div>
    </footer>
  );
}
