//

import {
  changeIssueStatus,
  fetchAncestorIssues,
  fetchChildIssues,
  fetchDescendantIssues,
  fetchHierarchicalIssueGroups,
  fetchIssue,
  fetchIssueHasChildren
} from "/main/api/redmine/issue";
import {
  addNote,
  fetchNotes
} from "/main/api/redmine/note";
import {
  fetchSettings
} from "/main/api/redmine/settings";
import {
  addSpentTime
} from "/main/api/redmine/spent-time";
import {
  fetchUser
} from "/main/api/redmine/user";


export const APIS = {
  fetchHierarchicalIssueGroups,
  fetchAncestorIssues,
  fetchChildIssues,
  fetchDescendantIssues,
  fetchIssue,
  fetchIssueHasChildren,
  changeIssueStatus,
  addSpentTime,
  fetchNotes,
  addNote,
  fetchUser,
  fetchSettings
};

export type ApiTypes = typeof APIS;