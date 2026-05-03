import { Task, TaskStatus } from 'types/tasks.types';

export type TableCell = { text: string } | { html: string };
export type TableRow = TableCell[];

export const getTaskActionsHtml = (taskId: number): string => `
  <div style="display: inline;">
    <a href="/${taskId}/status" class="govuk-button govuk-button--secondary">Edit</a>
    <form method="POST" action="/${taskId}" style="display: inline; margin-left: 10px;">
      <button class="govuk-button govuk-button--warning" type="submit">Delete</button>
    </form>
  </div>
`;

export const mapTasksToTableRows = (tasks: Task[]): TableRow[] =>
  tasks.map(task => [
    { text: task.id.toString() },
    { text: task.title },
    { text: task.description ?? '' },
    { text: task.status },
    task.dueDate
      ? { text: new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }
      : { text: '' },
    { html: getTaskActionsHtml(task.id) },
  ]);

export const buildCreateTaskPayload = (body: {
  title?: string;
  description?: string;
  status?: TaskStatus;
  'dueDate-day'?: string;
  'dueDate-month'?: string;
  'dueDate-year'?: string;
}) => {
  const day = body['dueDate-day'];
  const month = body['dueDate-month'];
  const year = body['dueDate-year'];

  const dueDate = day && month && year ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00` : null;

  return {
    title: body.title,
    description: body.description ?? null,
    status: body.status,
    dueDate,
  };
};
