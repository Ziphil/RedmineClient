//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Activity} from "/renderer/type";


export const ActivityItem = create(
  require("./activity-item.scss"), "ActivityItem",
  function ({
    activity
  }: {
    activity: Activity
  }): ReactElement {

    return (
      <div styleName="root">
        {activity.issue.id}
      </div>
    );

  }
);