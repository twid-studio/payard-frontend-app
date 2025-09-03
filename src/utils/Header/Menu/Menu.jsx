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
import { DataContext } from "@/lib/providers/DataProvider/context";

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
  const { data } = useContext(DataContext);
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
                {data.linksList.map(
                  (currI, i) =>
                    currI.type === "anchor" && (
                      <motion.li key={i} {...anim(MenuAnim.links)} custom={i}>
                        {pathname !== page ? (
                          <Link
                            href={page}
                            onClick={(e) => handlerLinkScrollTo(currI.slug)}
                            scroll={true}
                          >
                            <h1 className="second-mobile">{currI.title}</h1>
                          </Link>
                        ) : (
                          <Link
                            href={currI.slug || "/"}
                            onClick={(e) => handlerScrollTo(e, currI.slug)}
                          >
                            <h1 className="second-mobile">{currI.title}</h1>
                          </Link>
                        )}
                      </motion.li>
                    )
                )}
                <motion.div
                  {...anim(MenuAnim.links)}
                  custom={linksList.top.length}
                  className={s.buttonWrapper}
                >
                  <ButtonMain link="/" text="Get in Touch" />
                </motion.div>
              </ul>
              <div className={s.bottom}>
                {data.linksList.map(
                  (currI, i) =>
                    currI.type === "dropdown" && (
                      <>
                        <motion.h2
                          {...anim(MenuAnim.links)}
                          custom={linksList.top.length + 0.5}
                          className={`shadow ${s.bottomTitle}`}
                        >
                          {currI.title}
                        </motion.h2>
                        {currI.options.map((currL, i) => (
                          <Link
                            onClick={handleMenuClick}
                            scroll={true}
                            key={i}
                            href={currL.slug}
                          >
                            <motion.h2
                              {...anim(MenuAnim.links)}
                              custom={linksList.top.length + i}
                            >
                              {currL.name}
                            </motion.h2>
                          </Link>
                        ))}
                      </>
                    )
                )}
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
                {data.singInButtons.map((currButton, i) => (
                  <>
                    {currButton.type === "black" && (
                      <Link
                        href={currButton.link}
                        className={`${s.button} ${s.blackButton}`}
                        key={i}
                      >
                        {currButton.text}
                      </Link>
                    )}
                    {currButton.type === "transparent" && (
                      <Link
                        href={currButton.link}
                        className={`${s.button} ${s.transparentButton}`}
                        key={i}
                      >
                        {currButton.text}
                      </Link>
                    )}
                  </>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
