//

import {css} from "@linaria/core";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";


const styles = {
  root: css`
    border-block-end: solid 1px hsla(0, 0%, 0%, 0.07);
    grid-template-columns: 30% repeat(30, 1fr);
    display: grid;
  `,
  item: css`
    margin-block-end: 4px;
    row-gap: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  date: css`
    font-size: 12px;
  `,
  day: css`
    font-size: 10px;
  `
};

export const IssueChartHeader = function ({
  businessDays
}: {
  businessDays: Array<Dayjs>
}): ReactElement {

  return (
    <div className={styles.root}>
      {businessDays.map((day, index) => (
        <div className={styles.item} key={day.format("YYYY-MM-DD")} style={{gridColumnStart: index + 2, gridColumnEnd: index + 2}}>
          <span className={styles.date}>{day.format("D")}</span>
          <span className={styles.day}>{day.format("ddd")}</span>
        </div>
      ))}
    </div>
  );

};