//


export interface Issue {

  id: number;
  subject: string;
  project: {id: number, name: string};
  tracker: Tracker;
  ratio: number;
  startDate: string | null;
  dueDate: string | null;
  parentIssue: {id: number} | null;

}


export interface HierarchicalIssue {

  id: number;
  subject: string;
  project: {id: number, name: string};
  tracker: Tracker;
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