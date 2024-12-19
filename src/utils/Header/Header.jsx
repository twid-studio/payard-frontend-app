import Link from "next/link";
import { Logo, LogoWhite } from "../Logo/Logo";
import s from "./Header.module.scss";
import {
  AnchorButtonMain,
  ButtonBlack,
  ButtonMain,
  ButtonTransparent,
} from "../Button/Button";
import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Menu } from "./Menu/Menu";
import { motion, useAnimation } from "framer-motion";
import { anim, MenuAnim } from "@/lib/helpers/anim";
import { usePathname } from "next/navigation";
import { AnchorLink } from "../AnchorLink/AnchorLink";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { URL_HEADER } from "@/lib/helpers/DataUrls";
import { DataContext } from "@/lib/providers/DataProvider/context";

const Header = () => {
  return (
    <DataProvider url={URL_HEADER}>
      <HeaderBody />
    </DataProvider>
  );
};

const HeaderBody = () => {
  const [isActive, setIsActive] = useState(false);

  const { data } = useContext(DataContext);

  const pathname = usePathname();

  return (
    <motion.header
      {...anim(MenuAnim.headerMain)}
      className={clsx(s.header, {
        [s.header_active]: !isActive,
      })}
    >
      <Link scroll={false} href="/" className={s.header__logo}>
        {pathname !== "/pricing/business" ? <Logo /> : <LogoWhite />}
      </Link>

      <ul className={s.links} data-only-desktop--flex>
        {data.linksList.map((currLink, index) => (
          <li key={`header_link_${index}`} className={s.links_item}>
            {currLink?.slug ? (
              <AnchorLink
                className={`${s.link} text-hover`}
                toSection={currLink.slug}
                page="/"
              >
                {currLink.title}
              </AnchorLink>
            ) : (
              <DropDown label={currLink.title} inside={currLink.options} />
            )}
          </li>
        ))}
        <AnchorButtonMain link="#contact" text="Get in Touch" />
        <div className={s.bg} />
      </ul>

      <div
        className={clsx(s.log_in_buttons, {
          [s.log_in_buttons__invert]: pathname === "/pricing/business",
        })}
        data-only-desktop--flex
      >
        {data.singInButtons.map((currButton, i) => {
          switch (currButton.type) {
            case "main":
              return <ButtonMain
                link={currButton.link}
                text={currButton.text}
                target="_blank"
                key={i}
                addClass={s.log_in_buttons__button}
              />;
            case "black":
              return <ButtonBlack
                link={currButton.link}
                text={currButton.text}
                target="_blank"
                key={i}
                addClass={s.log_in_buttons__button}
              />;
            case "transparent":
              return <ButtonTransparent
                link={currButton.link}
                text={currButton.text}
                target="_blank"
                key={i}
              />;
          }
        })}
      </div>

      <Menu isActive={isActive} setIsActive={setIsActive} />
    </motion.header>
  );
};

const DropDown = ({ label, inside }) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    const handleScroll = () => {
      if (isActive) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  return (
    <div
      className={clsx(`${s.link} ${s.dropDown}`, {
        [s.dropDown_active]: isActive,
      })}
      ref={dropdownRef}
    >
      <div
        className={`${s.label} text-hover`}
        onClick={() => setIsActive(!isActive)}
      >
        <span>{label}</span>
        <svg
          className={s.arrow}
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.29358 5.91632L5.50636 6.12981L5.71885 5.91603L10.2128 1.39478L10.4159 1.19046L10.2199 0.979263L10.0499 0.795969L9.83742 0.566936L9.61719 0.788512L5.50607 4.92462L1.39496 0.788512L1.18219 0.574444L0.969412 0.788512L0.787226 0.971806L0.576732 1.18358L0.787512 1.39507L5.29358 5.91632Z"
            fill="#1E1515"
            stroke="#1E1515"
            strokeWidth="0.6"
          />
        </svg>
      </div>
      <div className={s.body}>
        {inside.map((currItem, i) => (
          <Link
            href={currItem.slug}
            key={i}
            className={s.dropDownLink}
            onClick={() => setIsActive(false)}
            scroll={false}
          >
            {currItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
