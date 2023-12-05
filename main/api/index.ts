//

import {
  addSpentTime,
  fetchIssues,
  makeIssueDone
} from "/main/api/redmine/issue";


export const APIS = {
  fetchIssues,
  makeIssueDone,
  addSpentTime
};

export type ApiTypes = typeof APIS;