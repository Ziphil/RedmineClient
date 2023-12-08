//

import MarkdownIt from "markdown-it";
import {client} from "/main/api/client";
import type {
  HierarchicalIssue,
  HierarchicalIssueGroup,
  Issue,
  Status,
  Tracker
} from "/renderer/type";


const markdown = new MarkdownIt();

/** 自分が担当のイシューを取得します。
 * イシューはプロジェクトごとにグループ化されます。
 * イシューやイシューグループの順番は一定とは限らないので、適宜ソートしてください。 */
export async function fetchHierarchicalIssues({}: {}): Promise<Array<HierarchicalIssueGroup>> {
  const params = {
    assignedToId: "me",
    limit: 100
  };
  const response = await client.get("/issues.json", {params});
  const rawIssues = response.data.issues as Array<any>;
  const issues = rawIssues.map((rawIssue) => createIssue(rawIssue));
  const issueGroups = groupHierarchicalIssues(hierarchizeIssues(issues));
  return issueGroups;
}

export async function fetchIssue({id}: {id: number}): Promise<Issue> {
  const response = await client.get(`/issues/${id}.json`);
  const rawIssue = response.data.issue;
  const singleIssue = createIssue(rawIssue);
  return singleIssue;
}

export async function changeIssueStatus({id, status}: {id: number, status: Status}): Promise<void> {
  const body = {
    issue: {
      statusId: fromStatus(status)
    }
  };
  await client.put(`/issues/${id}.json`, body);
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
  await client.post("/time_entries.json", body);
}

type InnerHierarchicalIssue = HierarchicalIssue & {parentIssueId: number | null, actualParentIssueId: number | null};

function createIssue(rawIssue: Record<string, any>): Issue {
  const customField = rawIssue.customField as Array<any> | undefined;
  const requestCustomField = customField?.find((field) => field.id === 3);
  const requirementCustomField = customField?.find((field) => field.id === 6);
  return {
    id: rawIssue.id,
    subject: rawIssue.subject,
    description: markdown.render(rawIssue.description ?? ""),
    requirement: requirementCustomField ? markdown.render(requirementCustomField.value ?? "") : "",
    project: rawIssue.project,
    tracker: toTracker(rawIssue.tracker.id),
    status: toStatus(rawIssue.status.id),
    category: rawIssue.category ?? null,
    version: rawIssue.fixedVersion ?? null,
    ratio: rawIssue.doneRatio,
    assignedUser: rawIssue.assignedTo ? {id: rawIssue.assignedTo.id, name: rawIssue.assignedTo.name} : null,
    requestedUser: requestCustomField ? {id: requestCustomField.value} : null,
    startDate: rawIssue.startDate,
    dueDate: rawIssue.dueDate,
    parentIssue: rawIssue.parent ? {id: rawIssue.parent.id} : null
  };
}

function hierarchizeIssues(issues: Array<Issue>): Array<HierarchicalIssue> {
  const issueMap = new Map<number, InnerHierarchicalIssue>(issues.map((issue) => [issue.id, {
    ...issue,
    parentIssueId: issue.parentIssue?.id ?? null,
    actualParentIssueId: null,
    childIssues: []
  }]));
  for (const issue of issueMap.values()) {
    if (issue.parentIssueId !== null && issueMap.has(issue.parentIssueId)) {
      issueMap.get(issue.parentIssueId)!.childIssues.push(issue);
      issue.actualParentIssueId = issue.parentIssueId;
    }
  }
  const rootIssues = Array.from(issueMap.values()).filter((issue) => issue.actualParentIssueId === null);
  return rootIssues;
}

function groupHierarchicalIssues(issues: Array<HierarchicalIssue>): Array<HierarchicalIssueGroup> {
  const projects = new Map<number, HierarchicalIssueGroup>();
  for (const issue of issues) {
    if (projects.has(issue.project.id)) {
      projects.get(issue.project.id)!.issues.push(issue);
    } else {
      projects.set(issue.project.id, {...issue.project, issues: [issue]});
    }
  }
  return Array.from(projects.values());
}

function toTracker(id: number): Tracker {
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

function toStatus(id: number): Status {
  if (id === 1) {
    return "new";
  } else if (id === 2 || id === 3 || id === 4) {
    return "progress";
  } else if (id === 5) {
    return "closed";
  } else if (id === 6) {
    return "rejected";
  } else {
    return "other";
  }
}

function fromStatus(status: Status): number {
  if (status === "new") {
    return 1;
  } else if (status === "progress") {
    return 2;
  } else if (status === "closed") {
    return 5;
  } else if (status === "rejected") {
    return 6;
  } else {
    return 1;
  }
}