import Link from "next/link";
import { Logo } from "../Logo/Logo";
import s from "./Header.module.scss";
import { useContext } from "react";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { DataContext } from "@/lib/providers/DataProvider/context";
import { URL_HEADER } from "@/lib/helpers/DataUrls";

const Header = () => {
  return (
    <DataProvider url={URL_HEADER}>
      <HeaderContent />
    </DataProvider>
  );
};

const HeaderContent = () => {
  const { data: linksList } = useContext(DataContext);

  return (
    <header className={s.header}>
      <Logo className={s.header__logo} />

      <div className={s.header__wrapper}>
        <ul className={s.header__list_links}>
          {linksList.map((currLink, index) => (
            <li key={`header_link_${index}`}>
              <Link className={s.header__link} href={currLink.link}>
                <span>{currLink.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
