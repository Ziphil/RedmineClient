//

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {IssueView} from "/renderer/component/module/issue-view";
import {getStatusSpec} from "/renderer/component/module/status-view";
import {useResponse} from "/renderer/hook/request";
import {CloseActivity} from "/renderer/type";


export const CloseActivityItem = create(
  require("./close-activity-item.scss"), "CloseActivityItem",
  function ({
    activity
  }: {
    activity: CloseActivity
  }): ReactElement {

    const [issue] = useResponse("fetchIssue", window.api.fetchIssue, {id: activity.issue.id});

    const [icon, label] = (issue !== undefined) ? getStatusSpec(issue.status) : [undefined, ""];

    return (
      <div styleName="root">
        <div styleName="left">
          {(icon !== undefined) && <FontAwesomeIcon styleName="icon" icon={icon}/>}
        </div>
        <div styleName="right">
          <div styleName="date">
            <span>{dayjs(activity.date).format("HH:mm")}</span>
          </div>
          <div styleName="main">
            <div styleName="issue">
              {(issue !== undefined) && <IssueView issue={issue}/>}
            </div>
          </div>
        </div>
      </div>
    );

  }
);