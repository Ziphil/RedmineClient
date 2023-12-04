//

import {
  client
} from "/main/api/client";
import {
  Issue
} from "/main/type";


export async function fetchIssues({}: {}): Promise<Array<Issue>> {
  const response = await client.get("/issues.json", {params: {assignedToId: "me", limit: 100}});
  const rawIssues = response.data.issues as Array<any>;
  const issues = rawIssues.map((rawIssue) => createIssue(rawIssue));
  return issues;
}

function createIssue(raw: any): Issue {
  return {
    id: raw.id,
    project: raw.project,
    subject: raw.subject,
    startDate: raw.startDate,
    dueDate: raw.dueDate
  };
}