//


export interface Issue {

  id: number;
  subject: string;
  description: string;
  project: {id: number, name: string};
  tracker: Tracker;
  status: Status;
  ratio: number;
  startDate: string | null;
  dueDate: string | null;
  parentIssue: {id: number} | null;

}


export interface HierarchicalIssue {

  id: number;
  subject: string;
  description: string;
  project: {id: number, name: string};
  tracker: Tracker;
  status: Status;
  ratio: number;
  startDate: string | null;
  dueDate: string | null;
  childIssues: Array<HierarchicalIssue>;

}


export interface HierarchicalIssueGroup {

  id: number;
  name: string;
  issues: Array<HierarchicalIssue>;

}


export type Tracker = "feature" | "bug" | "refactor" | "support" | "other";
export type Status = "new" | "progress" | "closed" | "rejected" | "other";