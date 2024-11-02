import React from "react";
import { Logo } from "../Logo/Logo";

import s from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";

const linksList = {
  anchor: [
    {
      text: "Banking",
      link: "/",
    },
    {
      text: "Services",
      link: "/",
    },
    {
      text: "Consulting",
      link: "/",
    },
  ],
  terms: [
    {
      text: "Fees & Commissions",
      link: "/",
    },
    {
      text: "Terms & Conditions",
      link: "/",
    },
    {
      text: "Privacy Policy",
      link: "/",
    },
  ],
  pricing: [
    {
      text: "For Business Account",
      link: "/",
    },
    {
      text: "For Personal Account",
      link: "/",
    },
  ],
};

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={"grid " + s.top}>
        <Link href="https://maps.app.goo.gl/ZQLcVNVGWf7SbsyF7" target="_blank" className={"bold text-hover " + s.adress}>
          <p>Office Adress</p>
          <p>
            BC, Vancouver - Pacific centre 70 West Georgia street, Suite 1500
            Vancouver BC V7Y 1C6 , Canada Records office inform
          </p>
        </Link>

        <div className={s.list}>
          <p className={"bold " + s.list_title}>More Info</p>
          {linksList.anchor.map((curr, i) => (
            <Link href={curr.link} key={i} className="small-text text-hover">
              {curr.text}
            </Link>
          ))}
        </div>
        <div className={s.list}>
          <p className={"bold " + s.list_title}>Terms</p>
          {linksList.terms.map((curr, i) => (
            <Link href={curr.link} key={i} className="small-text text-hover">
              {curr.text}
            </Link>
          ))}
        </div>
        <div className={s.list}>
          <p className={"bold " + s.list_title}>Pricing</p>
          {linksList.pricing.map((curr, i) => (
            <Link href={curr.link} key={i} className="small-text text-hover">
              {curr.text}
            </Link>
          ))}
        </div>
      </div>
      <div className={s.logo}>
        <Image src="/images/footer/logo.svg" fill alt="" />
      </div>
      <div className={"grid " + s.bottom}>
        <p className="shadow small-text second-mobile second-tablet">2024 Copyright PaYard</p>
        <p className={"shadow small-text second-mobile second-tablet " + s.trademark}>
          Google Pay is a trademark of Google LLC
          <br />
          Transaction limits are subject to terms and conditions
        </p>
        <Link href="https://twid.marketing/" target="_blank" className={"shadow text-hover small-text second-mobile second-tablet " + s.link}>
          Made by twid
        </Link>
      </div>
    </footer>
  );
}
