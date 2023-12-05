//

import {
  client
} from "/main/api/client";
import type {
  Issue,
  IssueGroup,
  Tracker
} from "/renderer/type";


/** 自分が担当のイシューを取得します。
 * イシューはプロジェクトごとにグループ化されます。
 * イシューやイシューグループの順番は一定とは限らないので、適宜ソートしてください。 */
export async function fetchIssues({}: {}): Promise<Array<IssueGroup>> {
  const params = {
    assignedToId: "me",
    limit: 100
  };
  const response = await client.get("/issues.json", {params});
  const rawIssues = response.data.issues as Array<any>;
  const singleIssues = rawIssues.map((rawIssue) => createSingleIssue(rawIssue));
  const issueGroups = groupIssues(hierarchizeSingleIssues(singleIssues));
  return issueGroups;
}

/** 指定されたイシューの状態を「終了 (ID 5)」にします。 */
export async function makeIssueDone(id: number): Promise<void> {
  const body = {
    issue: {
      statusId: 5
    }
  };
  const response = await client.put(`/issues/${id}.json`, body);
}

/** 指定されたイシューに作業時間を追加します。
 * 追加される作業時間の種類は「開発作業 (ID 9)」になります。 */
export async function addSpentTime(id: number, time: number): Promise<void> {
  const body = {
    timeEntry: {
      issueId: id,
      activityId: 9,
      hours: time / 1000 / 60 / 60
    }
  };
  const response = await client.post("/time_entries.json", body);
}

type SingleIssue = Omit<Issue, "childIssues"> & {parentId: number | null};
type InnerIssue = Issue & {parentId: number | null, actualParentId: number | null};

function createSingleIssue(rawIssue: any): SingleIssue {
  return {
    id: rawIssue.id,
    parentId: rawIssue.parent ? rawIssue.parent.id : null,
    project: rawIssue.project,
    tracker: getTracker(rawIssue.tracker.id),
    ratio: rawIssue.doneRatio,
    spentTime: rawIssue.spentHours * 1000 * 60 * 60,
    subject: rawIssue.subject,
    startDate: rawIssue.startDate,
    dueDate: rawIssue.dueDate
  };
}

function getTracker(id: number): Tracker {
  if (id === 2) {
    return "feature";
  } else if (id === 1) {
    return "bug";
  } else if (id === 7) {
    return "refactor";
  } else if (id === 3) {
    return "support";
  } else {
    return "other";
  }
}

function hierarchizeSingleIssues(singleIssues: Array<SingleIssue>): Array<Issue> {
  const issueMap = new Map<number, InnerIssue>(singleIssues.map((singleIssue) => [singleIssue.id, {...singleIssue, actualParentId: null, childIssues: []}]));
  for (const issue of issueMap.values()) {
    if (issue.parentId !== null && issueMap.has(issue.parentId)) {
      issueMap.get(issue.parentId)!.childIssues.push(issue);
      issue.actualParentId = issue.parentId;
    }
  }
  const rootIssues = Array.from(issueMap.values()).filter((issue) => issue.actualParentId === null);
  return rootIssues;
}

function groupIssues(issues: Array<Issue>): Array<IssueGroup> {
  const projects = new Map<number, IssueGroup>();
  for (const issue of issues) {
    if (projects.has(issue.project.id)) {
      projects.get(issue.project.id)!.issues.push(issue);
    } else {
      projects.set(issue.project.id, {...issue.project, issues: [issue]});
    }
  }
  return Array.from(projects.values());
}