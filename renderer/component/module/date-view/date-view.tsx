//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {data} from "/renderer/util/data";


const styles = {
  root: css`
    row-gap: 0.2em;
    column-gap: 0.3em;
    display: flex;
    &[data-orientation="vertical"] {
      flex-direction: column;
      align-items: center;
    }
    &[data-orientation="horizontal"] {
      flex-direction: row;
      align-items: baseline;
    }
  `,
  hairia: css`
  `,
  date: css`
  `,
  month: css`
    font-size: 80%;
  `,
  slash: css`
    margin-inline: 0.1em;
    font-size: 80%;
  `,
  day: css`
    font-size: 80%;
  `,
  dot: css`
    &[data-orientation="vertical"] {
      display: none;
    }
  `,
  paren: css`
    &[data-orientation="vertical"] {
      display: none;
    }
  `
};

export const DateView = function ({
  date,
  orientation = "vertical"
}: {
  date: Dayjs,
  orientation?: "vertical" | "horizontal"
}): ReactElement {

  return (
    <div className={styles.root} {...data({orientation})}>
      <div className={styles.hairia}>
        {getHairia(date)}
      </div>
      <div className={styles.dot} {...data({orientation})}>·</div>
      <div className={styles.date}>
        <span className={styles.month}>{date.format("MM")}</span>
        <span className={styles.slash}>/</span>
        <span>{date.format("DD")}</span>
      </div>
      <div className={styles.day}>
        <span className={styles.paren} {...data({orientation})}>(</span>
        {date.format("ddd")}
        <span className={styles.paren} {...data({orientation})}>)</span>
      </div>
    </div>
  );

};


function getHairia(date: Dayjs): number {
  return date.diff(dayjs("2012-01-22"), "day");
}