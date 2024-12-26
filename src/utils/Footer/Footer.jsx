import React, { useContext } from "react";

import s from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AnchorLink } from "../AnchorLink/AnchorLink";
import { DataContext } from "@/lib/providers/DataProvider/context";
import clsx from "clsx";

export default function Footer({ showedForm }) {
  const { data } = useContext(DataContext);

  const adress = data.adress;
  const bottom = data.bottom;

  const p = [
    {
      title: "More Info",
      list: data.moreInfoList,
    },
    {
      title: "Terms",
      list: data.termsList,
    },
    {
      title: "Pricing",
      list: data.pricingList,
    },
  ];

  return (
    <footer className={clsx(s.footer, {
      [s.footer_margin]: showedForm
    })}>
      <div className={"grid " + s.top}>
        <Link
          scroll={false}
          href={adress.link}
          target="_blank"
          className={"bold text-hover " + s.adress}
        >
          <p>{adress.title}</p>
          <p dangerouslySetInnerHTML={{ __html: adress.text }}/>
        </Link>

        {p.map((currList, wrapperIndex) => (
          <div className={s.list} key={wrapperIndex}>
            <p className={"bold " + s.list_title}>{currList.title}</p>
            {currList.list.map((curr, i) => {
              return curr.type === "anchor" ? (
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
              );
            })}
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
