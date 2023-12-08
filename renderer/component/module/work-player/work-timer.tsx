//

import dayjs from "dayjs";
import {ReactElement, useEffect, useState} from "react";
import {create} from "/renderer/component/create";
import {TimeView} from "/renderer/component/module/time-view";
import {Work} from "/renderer/type";
import {aria} from "/renderer/util/data";


export const WorkTimer = create(
  require("./work-timer.scss"), "WorkTimer",
  function ({
    work
  }: {
    work: Work
  }): ReactElement {

    const [time, setTime] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        const time = ((work.startDate !== null) ? dayjs().diff(work.startDate, "millisecond") : 0) + work.additionalTime;
        setTime(time);
      }, 23);
      return () => clearInterval(interval);
    }, [work.startDate, work.additionalTime]);

    return (
      <div styleName="root">
        <div styleName="main">
          <TimeView time={time}/>
        </div>
        <div styleName="border" {...aria({hidden: true})}>
          <TimeView time={time}/>
        </div>
        <div styleName="shadow" {...aria({hidden: true})}>
          <TimeView time={time}/>
        </div>
      </div>
    );

  }
);