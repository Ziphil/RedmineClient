//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";


const styles = {
  root: css`
    row-gap: 0.2em;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  `
};

export const DateView = function ({
  date
}: {
  date: Dayjs
}): ReactElement {

  return (
    <div className={styles.root}>
      <div className={styles.hairia}>
        {getHairia(date)}
      </div>
      <div className={styles.date}>
        <span className={styles.month}>{date.format("MM")}</span>
        <span className={styles.slash}>/</span>
        <span>{date.format("DD")}</span>
      </div>
      <div className={styles.day}>
        {date.format("ddd")}
      </div>
    </div>
  );

};


function getHairia(date: Dayjs): number {
  return date.diff(dayjs("2012-01-22"), "day");
}