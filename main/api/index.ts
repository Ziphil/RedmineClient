//

import {
  addSpentTime,
  changeIssueStatus,
  fetchHierarchicalIssues,
  fetchIssue
} from "/main/api/redmine/issue";


export const APIS = {
  fetchHierarchicalIssues,
  fetchIssue,
  changeIssueStatus,
  addSpentTime
};

export type ApiTypes = typeof APIS;