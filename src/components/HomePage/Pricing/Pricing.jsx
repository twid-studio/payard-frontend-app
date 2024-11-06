import React from "react";
import s from "./Pricing.module.scss";
import { ButtonMain } from "@/utils/Button/Button";
import { Paragraph } from "@/utils/ParagraphAnim/ParagraphAnim";

const cardsContent = [
  {
    cardColor: "black",
    type: "Business account",
    table: [
      {
        fisrtTitle: "One time fees",
        secondTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Open Account",
            second: "500",
          },
          {
            first: "Open Account (high risk business) ",
            second: "1500",
          },
        ],
      },
      {
        fisrtTitle: "Recurring fees",
        secondTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Monthly fee",
            second: "100",
          },
        ],
      },
    ],
    transfersTable: [
      {
        fisrtTitle: "One time fees",
        secondTitle: "Fee %",
        thirdTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Outgoing transfer",
            second: "0,3",
            secondUnder: "(min 15€)",
            third: "15",
            thirdUnder: "(min 15€)",
          },
          {
            first: "Incoming transfer",
            second: false,
            third: false,
          },
        ],
      },
    ],
  },
  {
    cardColor: "white",
    type: "Personal Account",
    table: [
      {
        fisrtTitle: "One time fees",
        secondTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Open Account",
            second: "Free",
          },
        ],
      },
      {
        fisrtTitle: "Recurring fees",
        secondTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Monthly fee",
            second: "25",
          },
        ],
      },
    ],
    transfersTable: [
      {
        fisrtTitle: "One time fees",
        secondTitle: "Fee %",
        thirdTitle: "Fixed fee [EUR/USD/GBP]",
        values: [
          {
            first: "Outgoing transfer",
            second: "0,3",
            secondUnder: "(min 15€)",
            third: "15",
            thirdUnder: "(min 15€)",
          },
          {
            first: "Incoming transfer",
            second: false,
            third: false,
          },
        ],
      },
    ],
  },
];

export default function PricingHome() {
  return (
    <section className={s.pricing}>
      <div className={s.title}>
        <h1 className="super-text second-tablet second-mobile">
          <Paragraph
            paragraph={[
              "You&apos;re just a step away from unlocking our simple,",
            ]}
            classNames={s.title_anim}
          />
          <span className="edgy green">
            <Paragraph
              paragraph={["transparent pricing"]}
              classNames={s.title_anim}
            />
          </span>
        </h1>
        <p className={s.text}>
          No hidden fees, no surprises. PaYard’s clear, upfront pricing ensures
          you know exactly what you’re paying for—so you can focus on what
          matters.
        </p>
      </div>
      <div className={s.cards_wrapper}>
        {cardsContent.map((currCard, i) => (
          <Card card={currCard} key={i} />
        ))}
      </div>
    </section>
  );
}

const Card = ({ card }) => {
  const { cardColor, type, table, transfersTable } = card;
  const classForWrapper = `${s.card} ${
    cardColor === "black" ? s.card_black : ""
  }`;

  return (
    <div className={classForWrapper}>
      <div className={s.main}>
        <p className={s.tag}>{type}</p>
        <Table table={table} />
      </div>
      <div className={s.transfers}>
        <h2>Transfers</h2>
        <Table table={transfersTable} />
      </div>
      <div className={s.button}>
        <ButtonMain link="/" text="Learn More" />
      </div>
    </div>
  );
};

const Table = ({ table }) => (
  <div className={s.table}>
    {table.map((currT, i) => (
      <div className={s.table_content} key={i}>
        <ul className={`${s.tableWrapper} ${s.tableTop}`}>
          <li className={`${s.tableItem} shadow small-text second-mobile`}>
            {currT.fisrtTitle}
          </li>
          <li className={`${s.tableItem} shadow small-text second-mobile`}>
            {currT.secondTitle}
          </li>
          {currT.thirdTitle && (
            <li className={`${s.tableItem} shadow small-text second-mobile`}>
              {currT.thirdTitle}
            </li>
          )}
          <span className={s.line} />
        </ul>
        {currT.values.map((currT, j) => (
          <ul className={s.tableWrapper} key={i + j}>
            <li className={s.tableItem}>{currT.first}</li>
            <li className={s.tableItem}>
              {currT.second ? (
                <>
                  {currT.second === "Free" ? (
                    <h2 className={s.highlight}>Free</h2>
                  ) : (
                    <>
                      <h3>{currT.second}</h3>
                      <p>{currT?.secondUnder}</p>
                    </>
                  )}
                </>
              ) : (
                <h3 className="shadow">━</h3>
              )}
            </li>
            {currT.third !== undefined && (
              <li className={s.tableItem}>
                {currT.third ? (
                  <>
                    <h3>{currT.third}</h3>
                    <p>{currT?.thirdUnder}</p>
                  </>
                ) : (
                  <h3 className="shadow">━</h3>
                )}
              </li>
            )}
            <span className={s.line} />
          </ul>
        ))}
      </div>
    ))}
  </div>
);
