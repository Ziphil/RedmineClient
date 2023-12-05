//


export interface SingleIssue {

  id: number;
  parentId: number | null;
  subject: string;
  project: {id: number, name: string};
  startDate: string | null;
  dueDate: string | null;

}


export interface Issue {

  id: number;
  subject: string;
  project: {id: number, name: string};
  startDate: string | null;
  dueDate: string | null;
  childIssues: Array<Issue>;

}


export interface Project {

  id: number;
  name: string;
  issues: Array<Issue>;

}