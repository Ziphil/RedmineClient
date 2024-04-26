//

import {createIssue} from "/main/api/redmine/issue";
import {Settings} from "/main/api/settings";
import type {Activity, CloseActivity, TimeActivity} from "/renderer/type/activity";


export async function fetchActivities({date}: {date: string}): Promise<Array<Activity>> {
  console.log("api called", "fetchActivities");
  const settings = await Settings.get();
  const fetchTimeActivities = async function (): Promise<Array<TimeActivity>> {
    const response = await settings.client.get("/time_entries.json", {params: {
      from: date,
      to: date,
      userId: "me",
      limit: 100
    }});
    const rawEntries = response.data["timeEntries"];
    const activities = rawEntries.map(createTimeActivity);
    return activities;
  };
  const fetchCloseActivities = async function (): Promise<Array<CloseActivity>> {
    const response = await settings.client.get("/issues.json", {params: {
      assignedToId: "me",
      statusId: "closed",
      closedOn: `=${date}`,
      limit: 100
    }});
    const rawIssues = response.data["issues"];
    const activities = rawIssues.map(createCloseActivity);
    return activities;
  };
  const activities = await Promise.all([fetchTimeActivities(), fetchCloseActivities()]).then((array) => array.flat());
  return activities;
}

function createTimeActivity(rawEntry: Record<string, any>): TimeActivity {
  const activity = {
    type: "time",
    id: rawEntry["id"],
    project: {
      id: rawEntry["project"]["id"],
      name: rawEntry["project"]["name"]
    },
    issue: {
      id: rawEntry["issue"]["id"]
    },
    time: rawEntry["hours"] * 1000 * 60 * 60,
    date: rawEntry["createdOn"]
  } satisfies TimeActivity;
  return activity;
}

function createCloseActivity(rawIssue: Record<string, any>): CloseActivity {
  const activity = {
    type: "close",
    id: rawIssue["id"],
    project: {
      id: rawIssue["project"]["id"],
      name: rawIssue["project"]["name"]
    },
    issue: createIssue(rawIssue),
    date: rawIssue["closedOn"]
  } satisfies CloseActivity;
  return activity;
}
