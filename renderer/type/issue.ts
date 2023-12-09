//

import {HtmlString, Id} from "/renderer/type/common";


export interface Issue {

  id: Id;
  subject: string;
  description: HtmlString;
  requirement: HtmlString | null;
  project: {id: Id, name: string};
  tracker: Tracker;
  status: Status;
  category: {id: Id, name: string} | null;
  version: {id: Id, name: string} | null;
  ratio: number;
  assignedUser: {id: Id, name: string} | null;
  requestedUser: {id: Id} | null;
  startDate: string | null;
  dueDate: string | null;
  parentIssue: {id: Id} | null;

}


export interface HierarchicalIssue {

  id: Id;
  subject: string;
  description: HtmlString;
  requirement: HtmlString | null;
  project: {id: Id, name: string};
  tracker: Tracker;
  status: Status;
  category: {id: Id, name: string} | null;
  version: {id: Id, name: string} | null;
  ratio: number;
  assignedUser: {id: Id, name: string} | null;
  requestedUser: {id: Id} | null;
  startDate: string | null;
  dueDate: string | null;
  childIssues: Array<HierarchicalIssue>;

}


export interface HierarchicalIssueGroup {

  id: Id;
  name: string;
  issues: Array<HierarchicalIssue>;

}


export type Tracker = "feature" | "bug" | "refactor" | "support" | "other";
export type Status = "new" | "progress" | "closed" | "rejected" | "other";