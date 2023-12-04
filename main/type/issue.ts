//


export interface Issue {

  id: number;
  subject: string;
  project: {id: number, name: string};
  startDate: string | null;
  dueDate: string | null;

}