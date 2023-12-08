//

import dayjs from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Clock} from "/renderer/component/module/clock";
import {DateView} from "/renderer/component/module/date-view";


export const Header = create(
  require("./header.scss"), "Header",
  function ({
  }: {
  }): ReactElement {

    return (
      <header styleName="root">
        <div styleName="left">
          <DateView date={dayjs()} orientation="horizontal"/>
        </div>
        <div styleName="right">
          <Clock/>
        </div>
      </header>
    );

  }
);