import React, { useContext } from "react";
import s from "./UpcomingFeatures.module.scss";
import Image from "next/image";
import { DataContext } from "@/lib/providers/DataProvider/context";

const content = [
  {
    icon: "/images/features/icons/icon-1.png",
    title: "Asset Management",
    text: "Achieve up to 15% yearly returns with full capital protection and security."
  },
  {
    icon: "/images/features/icons/icon-2.png",
    title: "Tailored Investments",
    text: "Customized strategies to meet your unique investment goals and needs."
  },
  {
    icon: "/images/features/icons/icon-3.png",
    title: "Family Office",
    text: "Expert guidance for managing, growing, and preserving family wealth across generations."
  },
]

export default function UpcomingFeatures() {
  const { data } = useContext(DataContext);

  return (
    <section className={s.features}>
      <div className={s.content}>
        <div className={s.top}>
          <Image
            className={s.image}
            width={243}
            height={243}
            src="/images/features/6.gif"
            alt=""
          />
          <h1 className={"super-text second-tablet"}>Upcoming Features</h1>
        </div>

        <ul className={s.list}>
          {data.features.map((currI, i) => (
            <li className={s.item} key={i}>
              <div className={s.left}>
                <Image
                  width={50}
                  height={50}
                  src={currI?.icon}
                  alt="icon"
                />
                <span>{currI?.title}</span>
              </div>
              <p className={"shadow " + s?.text}>{currI.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
