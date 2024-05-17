//

import {faClock, faRight} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Clock} from "/renderer/component/module/clock";
import {IssueView} from "/renderer/component/module/issue-view";
import {TimeView} from "/renderer/component/module/time-view";
import {useResponse} from "/renderer/hook/request";
import {TimeActivity} from "/renderer/type";


export const TimeActivityItem = create(
  require("./time-activity-item.scss"), "TimeActivityItem",
  function ({
    activity
  }: {
    activity: TimeActivity
  }): ReactElement {

    const [issue] = useResponse("fetchIssue", window.api.fetchIssue, {id: activity.issue.id});

    return (
      <div styleName="root">
        <div styleName="clock">
          <Clock time={dayjs(activity.date)}/>
        </div>
        <div styleName="main">
          <div styleName="time-container">
            <FontAwesomeIcon styleName="time-icon" icon={faClock}/>
            <span styleName="time">
              <TimeView time={activity.time}/>
            </span>
          </div>
          <FontAwesomeIcon styleName="arrow" icon={faRight}/>
          <div styleName="issue">
            {(issue !== undefined) && (
              <IssueView issue={issue}/>
            )}
          </div>
        </div>
      </div>
    );

  }
);