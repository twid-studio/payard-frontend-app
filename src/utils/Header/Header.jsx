import Link from "next/link";
import { Logo } from "../Logo/Logo";
import s from "./Header.module.scss";
import { ButtonBlack, ButtonMain, ButtonTransparent } from "../Button/Button";
import { useState } from "react";
import clsx from "clsx";
import { Menu } from "./Menu/Menu";

const linksList = [
  {
    text: "Banking",
    slug: "/",
  },
  {
    text: "Services",
    slug: "/",
  },
  {
    text: "Pricing",
    dropDown: [
      {
        text: "For Business",
        slug: "/",
      },
      {
        text: "For Persons",
        slug: "/",
      },
    ],
  },
  {
    text: "Consulting",
    slug: "/",
  },
];

const Header = () => {
  return (
    <header className={s.header}>
      <Logo className={s.header__logo} />

      <ul className={s.links} data-only-desktop--flex>
        {linksList.map((currLink, index) => (
          <li key={`header_link_${index}`} className={s.links_item}>
            {currLink?.slug ? (
              <Link className={`${s.link} text-hover`} href={currLink.slug}>
                {currLink.text}
              </Link>
            ) : (
              <DropDown label={currLink.text} inside={currLink.dropDown} />
            )}
          </li>
        ))}
        <ButtonMain link="/" text="Get in Touch" />
        <div className={s.bg} />
      </ul>

      <div className={s.log_in_buttons} data-only-desktop--flex>
        <ButtonTransparent link="/" text="Sign in" />
        <ButtonBlack link="/" text="Log in" />
      </div>

      <Menu />
    </header>
  );
};

const DropDown = ({ label, inside }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={clsx(`${s.link} ${s.dropDown}`, {
      [s.dropDown_active]: isActive
    })}>
      <div className={`${s.label} text-hover`} onClick={() => setIsActive(!isActive)}>
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
          <Link href={currItem.slug} key={i} className={s.dropDownLink}>
            {currItem.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
