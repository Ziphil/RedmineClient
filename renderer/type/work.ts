//

import {Dayjs} from "dayjs";
import {Issue} from "/renderer/type/issue";


export interface Work {

  issue: Issue;
  startDate: Dayjs | null;
  additionalTime: number;

}