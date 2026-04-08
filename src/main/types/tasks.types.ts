export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'BLOCKED' | 'READY_FOR_REVIEW' | 'COMPLETED';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string | null;
}
