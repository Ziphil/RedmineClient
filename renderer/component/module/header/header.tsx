//

import {faRocketLaunch, faTasks, faWavePulse} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactElement} from "react";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {Clock} from "/renderer/component/module/clock";
import {DateView} from "/renderer/component/module/date-view";
import {useToday} from "/renderer/hook/today";


export const Header = create(
  require("./header.scss"), "Header",
  function ({
  }: {
  }): ReactElement {

    const today = useToday();

    return (
      <header styleName="root">
        <div styleName="left">
          <TransitionLink styleName="link" to="/chart">
            <FontAwesomeIcon styleName="icon" icon={faTasks}/>
            タスク
          </TransitionLink>
          <div styleName="link">
            <FontAwesomeIcon styleName="icon" icon={faRocketLaunch}/>
            プロジェクト
          </div>
          <TransitionLink styleName="link" to={`/activity/${today.format("YYYY-MM-DD")}`}>
            <FontAwesomeIcon styleName="icon" icon={faWavePulse}/>
            活動
          </TransitionLink>
        </div>
        <div styleName="right">
          <DateView date={today} orientation="horizontal"/>
          <Clock/>
        </div>
      </header>
    );

  }
);