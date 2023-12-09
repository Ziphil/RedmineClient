//

import {
  changeIssueStatus,
  fetchHierarchicalIssues,
  fetchIssue
} from "/main/api/redmine/issue";
import {
  addNote,
  fetchNotes
} from "/main/api/redmine/note";
import {
  addSpentTime
} from "/main/api/redmine/spent-time";


export const APIS = {
  fetchHierarchicalIssues,
  fetchIssue,
  changeIssueStatus,
  addSpentTime,
  fetchNotes,
  addNote
};

export type ApiTypes = typeof APIS;