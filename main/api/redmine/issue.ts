//

import dayjs from "dayjs";
import {
  client
} from "/main/api/client";
import {
  Issue
} from "/main/api/type/issue";


export async function fetchIssues({}: {}): Promise<any> {
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
    startDate: raw.startDate !== null ? dayjs(raw.startDate) : null,
    dueDate: raw.dueDate !== null ? dayjs(raw.dueDate) : null
  };
}