//

import dayjs from "dayjs";
import {ReactElement, useEffect, useState} from "react";
import {create} from "/renderer/component/create";


export const Clock = create(
  require("./clock.scss"), "Clock",
  function ({
  }: {
  }): ReactElement {

    const [now, setNow] = useState(dayjs());

    const hourString = now.format("HH");
    const minuteString = now.format("mm");

    useEffect(() => {
      const interval = setInterval(() => {
        setNow(dayjs());
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <span styleName="root">
        {[...hourString].map((digit, index) => (
          <span key={index} styleName="digit">{digit}</span>
        ))}
        <span styleName="colon">:</span>
        {[...minuteString].map((digit, index) => (
          <span key={index} styleName="digit">{digit}</span>
        ))}
      </span>
    );

  }
);