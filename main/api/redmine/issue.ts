//

import {getSettings} from "/main/api/settings";
import {renderMarkdown} from "/main/util/markdown";
import type {
  HierarchicalIssue,
  HierarchicalIssueGroup,
  Issue,
  IssueWithChildren,
  IssueWithDetails,
  Status,
  Tracker
} from "/renderer/type";
import {Id} from "/renderer/type/common";


/** 自分担当のオープンなイシューを全て取得します。
 * イシューはプロジェクトごとにグループ化されます。
 * イシューやイシューグループの順番は一定とは限らないので、適宜ソートしてください。 */
export async function fetchHierarchicalIssueGroups({}: {}): Promise<Array<HierarchicalIssueGroup>> {
  console.log("api called", "fetchHierarchicalIssueGroups");
  const settings = await getSettings();
  const response = await settings.client.get("/issues.json", {params: {
    assignedToId: "me",
    limit: 100
  }});
  const rawIssues = response.data["issues"] as Array<any>;
  const issues = rawIssues.map(createIssue);
  const issueGroups = groupHierarchicalIssues(hierarchizeIssues(issues));
  return issueGroups;
}

/** 指定されたイシューの先祖イシューを全て取得します。
 * 返される配列において、最後の要素ほど指定されたイシューに近く、最初の要素ほど指定されたイシューから遠くなっています。
 * 返される配列に、指定されたイシュー自身は含まれません。*/
export async function fetchAncestorIssues({id}: {id: Id}): Promise<Array<Issue>> {
  console.log("api called", "fetchAncestorIssues");
  const settings = await getSettings();
  const fetchAncestorIssuesRecursively = async function (id: Id): Promise<Array<Issue>> {
    const response = await settings.client.get(`/issues/${id}.json`);
    const rawIssue = response.data["issue"];
    const issue = createIssue(rawIssue);
    if (issue.parentIssue) {
      const parentIssues = await fetchAncestorIssuesRecursively(issue.parentIssue.id);
      return [...parentIssues, issue];
    } else {
      return [issue];
    }
  };
  const issues = await fetchAncestorIssuesRecursively(id);
  issues.pop();
  return issues;
}

/** 指定されたイシューの子イシューを全て取得します。
 * 孫イシュー (子イシューの子イシュー) 以降は取得しません。*/
export async function fetchChildIssues({id}: {id: Id}): Promise<Array<Issue>> {
  console.log("api called", "fetchChildIssues");
  const settings = await getSettings();
  const response = await settings.client.get("/issues.json", {params: {parentId: id}});
  const rawIssues = response.data["issues"] as Array<any>;
  const issues = rawIssues.map(createIssue);
  return issues;
}

/** 指定されたイシューの子孫イシューを全て取得します。*/
export async function fetchDescendantIssues({id}: {id: Id}): Promise<Array<IssueWithChildren>> {
  const settings = await getSettings();
  const fetchDescendantIssuesRecursively = async function (id: Id): Promise<Array<IssueWithChildren>> {
    const response = await settings.client.get("/issues.json", {params: {parentId: id}});
    const rawIssues = response.data["issues"] as Array<any>;
    const issues = rawIssues.map((rawIssue) => ({...createIssue(rawIssue), childIssues: []}));
    const filledIssues = await Promise.all(issues.map(async (issue) => {
      const childIssues = await fetchDescendantIssuesRecursively(issue.id);
      return {...issue, childIssues};
    }));
    return filledIssues;
  };
  const issues = await fetchDescendantIssuesRecursively(id);
  return issues;
}

export async function fetchIssue({id}: {id: Id}): Promise<IssueWithDetails> {
  console.log("api called", "fetchIssue");
  const settings = await getSettings();
  const response = await settings.client.get(`/issues/${id}.json`, {params: {include: "children,relations,journals"}});
  const rawIssue = response.data["issue"];
  const issue = await createIssueWithDetails(rawIssue);
  return issue;
}

export async function fetchIssueHasChildren({id}: {id: Id}): Promise<boolean> {
  console.log("api called", "fetchIssueHasChildren");
  const settings = await getSettings();
  const response = await settings.client.get("/issues.json", {params: {
    parentId: id,
    statusId: "*",
    limit: 1
  }});
  const rawIssues = response.data["issues"] as Array<any>;
  return rawIssues.length > 0;
}

export async function changeIssueStatus({id, status}: {id: Id, status: Status}): Promise<void> {
  console.log("api called", "changeIssueStatus");
  const settings = await getSettings();
  await settings.client.put(`/issues/${id}.json`, {issue: {statusId: fromStatus(status)}});
}

type InnerHierarchicalIssue = HierarchicalIssue & {parentIssueId: Id | null, actualParentIssueId: Id | null};

function createIssue(rawIssue: Record<string, any>): Issue {
  const customFields = rawIssue["customFields"] as Array<any> | undefined;
  const requirementCustomField = customFields?.find((field) => field["id"] === 6);
  const issue = {
    id: rawIssue["id"],
    subject: rawIssue["subject"],
    description: renderMarkdown(rawIssue["description"] ?? ""),
    requirement: requirementCustomField ? renderMarkdown(requirementCustomField["value"] ?? "") : null,
    project: {
      id: rawIssue["project"]["id"],
      name: rawIssue["project"]["name"].replace(/^(.+?)-\s*/, "")
    },
    tracker: toTracker(rawIssue["tracker"]["id"]),
    status: toStatus(rawIssue["status"]["id"]),
    ratio: rawIssue["doneRatio"],
    startDate: rawIssue["startDate"],
    dueDate: rawIssue["dueDate"],
    parentIssue: rawIssue["parent"] ? {id: rawIssue["parent"]["id"]} : null
  } satisfies Issue;
  return issue;
}

async function createIssueWithDetails(rawIssue: Record<string, any>): Promise<IssueWithDetails> {
  const settings = await getSettings();
  const customFields = rawIssue["customFields"] as Array<any> | undefined;
  const requestCustomField = customFields?.find((field) => field["id"] === 3);
  const fetchRequestedUser = async function (): Promise<{id: Id, name: string} | null> {
    if (requestCustomField && requestCustomField["value"]) {
      const response = await settings.client.get(`/users/${requestCustomField["value"]}.json`, {});
      const rawUser = response.data["user"];
      const user = {id: rawUser["id"], name: rawUser["lastname"] + " " + rawUser["firstname"]};
      return user;
    } else {
      return null;
    }
  };
  const issue = {
    ...createIssue(rawIssue),
    category: rawIssue["category"] ?? null,
    version: rawIssue["fixedVersion"] ?? null,
    assignedUser: rawIssue["assignedTo"] ? {id: rawIssue["assignedTo"]["id"], name: rawIssue["assignedTo"]["name"]} : null,
    requestedUser: await fetchRequestedUser().catch(() => null)
  } satisfies IssueWithDetails;
  return issue;
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