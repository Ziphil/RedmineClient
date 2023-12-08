//


export interface Issue {

  id: number;
  subject: string;
  description: string;
  requirement: string;
  project: {id: number, name: string};
  tracker: Tracker;
  status: Status;
  category: {id: number, name: string} | null;
  version: {id: number, name: string} | null;
  ratio: number;
  assignedUser: {id: number, name: string} | null;
  requestedUser: {id: number} | null;
  startDate: string | null;
  dueDate: string | null;
  parentIssue: {id: number} | null;

}


export interface HierarchicalIssue {

  id: number;
  subject: string;
  description: string;
  requirement: string;
  project: {id: number, name: string};
  tracker: Tracker;
  status: Status;
  category: {id: number, name: string} | null;
  version: {id: number, name: string} | null;
  ratio: number;
  assignedUser: {id: number, name: string} | null;
  requestedUser: {id: number} | null;
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