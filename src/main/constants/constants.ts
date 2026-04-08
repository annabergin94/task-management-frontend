import { TaskStatus } from 'types/tasks.types';

export const BASE_URL = 'http://localhost:4000/tasks';

export const STATUS_ITEMS: { value: TaskStatus; text: string }[] = [
  { value: 'PENDING', text: 'Pending' },
  { value: 'IN_PROGRESS', text: 'In Progress' },
  { value: 'BLOCKED', text: 'Blocked' },
  { value: 'READY_FOR_REVIEW', text: 'Ready for Review' },
  { value: 'COMPLETED', text: 'Completed' },
];
