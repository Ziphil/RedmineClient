//

import {
  client
} from "/main/api/client";
import {
  Issue,
  Project,
  SingleIssue
} from "/main/type";


export async function fetchIssues({}: {}): Promise<Array<Project>> {
  const response = await client.get("/issues.json", {params: {assignedToId: "me", limit: 100}});
  const rawIssues = response.data.issues as Array<any>;
  const singleIssues = rawIssues.map((rawIssue) => createSingleIssue(rawIssue));
  const projects = groupIssuesToProject(hierarchizeSingleIssues(singleIssues));
  return projects;
}

function createSingleIssue(raw: any): SingleIssue {
  return {
    id: raw.id,
    parentId: raw.parent ? raw.parent.id : null,
    project: raw.project,
    subject: raw.subject,
    startDate: raw.startDate,
    dueDate: raw.dueDate
  };
}

type InnerIssue = Issue & {parentId: number | null, actualParentId: number | null};

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

function groupIssuesToProject(issues: Array<Issue>): Array<Project> {
  const projects = new Map<number, Project>();
  for (const issue of issues) {
    if (projects.has(issue.project.id)) {
      projects.get(issue.project.id)!.issues.push(issue);
    } else {
      projects.set(issue.project.id, {...issue.project, issues: [issue]});
    }
  }
  return Array.from(projects.values());
}