//

import {Dayjs} from "dayjs";
import {HierarchicalIssue} from "/renderer/type/issue";


export interface Work {

  issue: HierarchicalIssue;
  startDate: Dayjs | null;
  additionalTime: number;

}