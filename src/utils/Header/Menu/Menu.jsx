import clsx from "clsx";
import React, { useContext, useState } from "react";

import s from "./Menu.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { anim, MenuAnim } from "@/lib/helpers/anim";
import Link from "next/link";
import {
  ButtonBlack,
  ButtonMain,
  ButtonTransparent,
} from "@/utils/Button/Button";
import { ScrollContext } from "@/lib/providers/ScrollProvider/context";
import { AnchorLink } from "@/utils/AnchorLink/AnchorLink";
import { usePathname } from "next/navigation";

const linksList = {
  top: [
    {
      text: "Banking",
      slug: "#banking",
    },
    {
      text: "Services",
      slug: "#services",
    },
    {
      text: "Consulting",
      slug: "#consulting",
    },
  ],
  bottom: [
    {
      text: "For Business",
      slug: "/pricing/business",
    },
    {
      text: "For Persons",
      slug: "/pricing/personal",
    },
  ],
};

const page = "/";

export const Menu = ({ isActive, setIsActive }) => {
  const { scrollTo, scrollStop, scrollResume } = useContext(ScrollContext);
  const pathname = usePathname();

  const handlerScrollTo = (e, toSection) => {
    handleMenuClick();
    e.preventDefault();
    setTimeout(() => {
      scrollTo(toSection);
    }, 100);
  };

  const handlerLinkScrollTo = (toSection) => {
    scrollResume();

    setIsActive(false);
    setTimeout(() => {
      scrollTo(toSection);
    }, 2100);
  };

  const handleMenuClick = () => {
    if (isActive) {
      scrollResume();
    } else {
      scrollStop();
    }
    setIsActive(!isActive);
  };

  return (
    <div data-not-desktop>
      <div
        className={clsx(s.button, {
          [s.button_active]: isActive,
        })}
        onClick={handleMenuClick}
      >
        <span className={s.line} />
        <span className={s.line} />
      </div>
      <AnimatePresence mode="wait">
        {isActive && (
          <>
            <motion.div className={s.menuBg} {...anim(MenuAnim.bg)} />
            <motion.div className={s.menu} {...anim(MenuAnim.menuBody)}>
              <ul className={s.menu_links}>
                {linksList.top.map((currI, i) => (
                  <motion.li
                    key={i}
                    {...anim(MenuAnim.links)}
                    custom={i}
                    // onClick={handleMenuClick}
                  >
                    {/* <AnchorLink
                      page="/"
                      toSection={currI.slug}
                    >
                      <h1 className="second-mobile">{currI.text}</h1>
                    </AnchorLink> */}
                    {pathname !== page ? (
                      <Link
                        href={page}
                        onClick={(e) => handlerLinkScrollTo(currI.slug)}
                        scroll={false}
                      >
                        <h1 className="second-mobile">{currI.text}</h1>
                      </Link>
                    ) : (
                      <Link
                        href={currI.slug || "/"}
                        onClick={(e) => handlerScrollTo(e, currI.slug)}
                      >
                        <h1 className="second-mobile">{currI.text}</h1>
                      </Link>
                    )}
                  </motion.li>
                ))}
                <motion.div
                  {...anim(MenuAnim.links)}
                  custom={linksList.top.length}
                  className={s.buttonWrapper}
                >
                  <ButtonMain link="/" text="Get in Touch" />
                </motion.div>
              </ul>
              <div className={s.bottom}>
                <motion.h2
                  {...anim(MenuAnim.links)}
                  custom={linksList.top.length + 0.5}
                  className={`shadow ${s.bottomTitle}`}
                >
                  Pricing
                </motion.h2>
                {linksList.bottom.map((currL, i) => (
                  <Link
                    onClick={handleMenuClick}
                    scroll={false}
                    key={i}
                    href={currL.slug}
                  >
                    <motion.h2
                      {...anim(MenuAnim.links)}
                      custom={linksList.top.length + i}
                    >
                      {currL.text}
                    </motion.h2>
                  </Link>
                ))}
              </div>
              <motion.span
                {...anim(MenuAnim.links)}
                custom={linksList.top.length}
                className={s.line}
              />
              <motion.div
                {...anim(MenuAnim.links)}
                custom={linksList.top.length + linksList.bottom.length}
                className={s.logInButtons}
              >
                <Link
                  href="https://client.payard.io/sign-in"
                  className={`${s.button} ${s.transparentButton}`}
                >
                  Sign in
                </Link>
                <Link
                  href="https://client.payard.io/sign-up"
                  className={`${s.button} ${s.blackButton}`}
                >
                  Log in
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
