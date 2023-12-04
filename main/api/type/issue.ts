//

import {Dayjs} from "dayjs";


export interface Issue {

  id: number;
  subject: string;
  project: {id: number, name: string};
  startDate: Dayjs | null;
  dueDate: Dayjs | null;

}