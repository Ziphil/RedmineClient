//

import {faArrowLeft, faArrowRight, faClock} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import SimpleBar from "simplebar-react";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {ActivityList} from "/renderer/component/module/activity-list";
import {DateView} from "/renderer/component/module/date-view";
import {TimeView} from "/renderer/component/module/time-view";
import {Activity, CloseActivity, TimeActivity} from "/renderer/type";
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

    const timeActivities = activities.filter((activity) => activity.type === "time") as Array<TimeActivity>;
    const closeActivities = activities.filter((activity) => activity.type === "close") as Array<CloseActivity>;
    const totalTime = timeActivities.reduce((total, activity) => total + activity.time, 0);

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
              <div styleName="total">
                <FontAwesomeIcon styleName="time-icon" icon={faClock}/>
                <span styleName="time-label">
                  合計
                </span>
                <span styleName="time">
                  <TimeView time={totalTime}/>
                </span>
              </div>
              <ActivityList activities={timeActivities}/>
            </article>
          </SimpleBar>
          <SimpleBar styleName="scroll">
            <article styleName="article">
              <h3 styleName="heading">完了タスク</h3>
              <ActivityList activities={closeActivities}/>
            </article>
          </SimpleBar>
        </div>
      </div>
    );

  }
);