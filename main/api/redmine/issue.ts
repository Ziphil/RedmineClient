//

import {client} from "/main/api/client";
import {renderMarkdown} from "/main/util/markdown";
import type {
  DetailedIssue,
  HierarchicalIssue,
  HierarchicalIssueGroup,
  Issue,
  Status,
  Tracker
} from "/renderer/type";
import {Id} from "/renderer/type/common";


/** 自分が担当のイシューを取得します。
 * イシューはプロジェクトごとにグループ化されます。
 * イシューやイシューグループの順番は一定とは限らないので、適宜ソートしてください。 */
export async function fetchHierarchicalIssues({}: {}): Promise<Array<HierarchicalIssueGroup>> {
  const params = {
    assignedToId: "me",
    limit: 100
  };
  const response = await client.get("/issues.json", {params});
  const rawIssues = response.data["issues"] as Array<any>;
  const issues = rawIssues.map(createIssue);
  const issueGroups = groupHierarchicalIssues(hierarchizeIssues(issues));
  return issueGroups;
}

export async function fetchAncestorIssues({id}: {id: Id}): Promise<Array<Issue>> {
  const rawIssues = [];
  let currentId = id;
  while (true) {
    const response = await client.get(`/issues/${currentId}.json`);
    const rawIssue = response.data["issue"];
    rawIssues.unshift(rawIssue);
    if (rawIssue["parent"]) {
      currentId = rawIssue["parent"]["id"];
    } else {
      break;
    }
  }
  rawIssues.pop();
  const issues = rawIssues.map(createIssue);
  return issues;
}

export async function fetchIssue({id}: {id: Id}): Promise<DetailedIssue> {
  const params = {
    include: "children,relations,journals"
  };
  const response = await client.get(`/issues/${id}.json`, {params});
  const rawIssue = response.data["issue"];
  const singleIssue = await createDetailedIssue(rawIssue);
  return singleIssue;
}

export async function changeIssueStatus({id, status}: {id: Id, status: Status}): Promise<void> {
  const body = {
    issue: {
      statusId: fromStatus(status)
    }
  };
  await client.put(`/issues/${id}.json`, body);
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
    project: rawIssue["project"],
    tracker: toTracker(rawIssue["tracker"]["id"]),
    status: toStatus(rawIssue["status"]["id"]),
    ratio: rawIssue["doneRatio"],
    startDate: rawIssue["startDate"],
    dueDate: rawIssue["dueDate"],
    parentIssue: rawIssue["parent"] ? {id: rawIssue["parent"]["id"]} : null
  };
  return issue;
}

async function createDetailedIssue(rawIssue: Record<string, any>): Promise<DetailedIssue> {
  const customFields = rawIssue["customFields"] as Array<any> | undefined;
  const requestCustomField = customFields?.find((field) => field["id"] === 3);
  const fetchRequestedUser = async function (): Promise<{id: Id, name: string} | null> {
    if (requestCustomField && requestCustomField["value"]) {
      const response = await client.get(`/users/${requestCustomField["value"]}.json`, {});
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
    requestedUser: await fetchRequestedUser()
  };
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