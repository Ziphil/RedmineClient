//

import {ReactElement} from "react";
import {useParams} from "react-router-dom";
import {create} from "/renderer/component/create";
import {ActivityList} from "/renderer/component/module/activity-list";
import {Page} from "/renderer/component/module/page";
import {useSuspenseResponse} from "/renderer/hook/request";


export const ActivityPage = create(
  require("./activity-page.scss"), "ActivityPage",
  function ({
  }: {
  }): ReactElement {

    const {date} = useParams();

    const [activities] = useSuspenseResponse("fetchIssue", window.api.fetchActivities, {date: date!});

    return (
      <Page>
        <ActivityList activities={activities}/>
      </Page>
    );

  }
);