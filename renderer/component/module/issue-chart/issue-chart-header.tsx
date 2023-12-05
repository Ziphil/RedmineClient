//

import {css} from "@linaria/core";
import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {data} from "/renderer/util/data";
import {borderColor, gradientBackground} from "/renderer/util/css";
import {DateView} from "../date-view";


const styles = {
  root: css`
    border-block-end: solid 1px ${borderColor()};
    grid-template-columns: 30% repeat(25, 1fr);
    display: grid;
  `,
  item: css`
    padding-block: 4px;
    row-gap: 2px;
    border-start-start-radius: 4px;
    border-start-end-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &[data-today] {
      font-weight: bold;
      ${gradientBackground(0.92)}
    }
  `,
  hairia: css`
    font-size: 12px;
  `,
  date: css`
    font-size: 12px;
  `,
  month: css`
    font-size: 10px;
  `,
  day: css`
    font-size: 10px;
  `
};

export const IssueChartHeader = function ({
  businessDates
}: {
  businessDates: Array<Dayjs>
}): ReactElement {

  return (
    <div className={styles.root}>
      {businessDates.map((date, index) => (
        <div
          className={styles.item}
          key={date.format("YYYY-MM-DD")}
          style={{gridColumnStart: index + 2, gridColumnEnd: index + 3}}
          {...data({today: date.isSame(dayjs(), "day")})}
        >
          <DateView date={date}/>
        </div>
      ))}
    </div>
  );

};