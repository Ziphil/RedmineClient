//

import {faChartSimpleHorizontal, faRocketLaunch, faWavePulse} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
          <div styleName="link">
            <FontAwesomeIcon styleName="icon" icon={faChartSimpleHorizontal}/>
            タスク
          </div>
          <div styleName="link">
            <FontAwesomeIcon styleName="icon" icon={faRocketLaunch}/>
            プロジェクト
          </div>
          <div styleName="link">
            <FontAwesomeIcon styleName="icon" icon={faWavePulse}/>
            活動
          </div>
        </div>
        <div styleName="right">
          <DateView date={dayjs()} orientation="horizontal"/>
          <Clock/>
        </div>
      </header>
    );

  }
);