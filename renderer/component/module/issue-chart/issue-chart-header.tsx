//

import dayjs, {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {DateView} from "/renderer/component/module/date-view";
import {data} from "/renderer/util/data";


export const IssueChartHeader = create(
  require("./issue-chart-header.scss"), "IssueChartHeader",
  function ({
    businessDates
  }: {
    businessDates: Array<Dayjs>
  }): ReactElement {

    return (
      <div styleName="root" style={{gridTemplateColumns: `1fr repeat(${businessDates.length}, 36px)`}}>
        {businessDates.map((date, index) => (
          <div
            styleName="item"
            key={date.format("YYYY-MM-DD")}
            style={{gridColumnStart: index + 2, gridColumnEnd: index + 3}}
            {...data({today: date.isSame(dayjs(), "day")})}
          >
            <DateView date={date}/>
          </div>
        ))}
      </div>
    );

  }
);