export type Task = {
  id: number;
  title: string;
  description: string;
  finishedDate: Date;
};

export type TaskToCreate = Omit<Task, 'id'>;
