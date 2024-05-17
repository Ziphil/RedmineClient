//

import {faArrowLeft, faArrowRight} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {ActivityList} from "/renderer/component/module/activity-list";
import {DateView} from "/renderer/component/module/date-view";
import {Activity} from "/renderer/type";
import {data} from "/renderer/util/data";


export const ActivityFullView = create(
  require("./activity-full-view.scss"), "ActivityFullView",
  function ({
    date,
    activities
  }: {
    date: Dayjs,
    activities: Array<Activity>
  }): ReactElement {

    return (
      <div styleName="root">
        <div styleName="top">
          <div styleName="navigation">
            <TransitionLink styleName="link" to={`/activity/${date.subtract(1, "day").format("YYYY-MM-DD")}`}>
              <FontAwesomeIcon styleName="link-icon" icon={faArrowLeft} {...data({position: "left"})}/>
              前日
            </TransitionLink>
            <span>·</span>
            <TransitionLink styleName="link" to={`/activity/${date.add(1, "day").format("YYYY-MM-DD")}`}>
              翌日
              <FontAwesomeIcon styleName="link-icon" icon={faArrowRight} {...data({position: "right"})}/>
            </TransitionLink>
          </div>
          <div styleName="date">
            <DateView date={date} orientation="horizontal"/>
          </div>
        </div>
        <div styleName="bottom">
          <SimpleBar styleName="scroll">
            <article styleName="article">
              <h3 styleName="heading">作業時間記録</h3>
              <ActivityList activities={activities}/>
            </article>
          </SimpleBar>
        </div>
      </div>
    );

  }
);