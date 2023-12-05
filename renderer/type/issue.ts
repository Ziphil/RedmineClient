//


export interface Issue {

  id: number;
  subject: string;
  project: {id: number, name: string};
  tracker: Tracker;
  ratio: number;
  spentTime: number;
  startDate: string | null;
  dueDate: string | null;
  childIssues: Array<Issue>;

}


export interface IssueGroup {

  id: number;
  name: string;
  issues: Array<Issue>;

}


export type Tracker = "feature" | "bug" | "refactor" | "support" | "other";