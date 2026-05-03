import { Application } from 'express';
import axios from 'axios';
import { BASE_URL, STATUS_ITEMS } from 'constants/constants';
import { Task } from 'types/tasks.types';
import { buildCreateTaskPayload, mapTasksToTableRows } from 'utils/task-utils';

export default function (app: Application): void {
  app.get('/', async (_req, res) => {
    try {
      const response = await axios.get(BASE_URL);
      const tasks: Task[] = Array.isArray(response.data) ? response.data : [];
      const tableRows = mapTasksToTableRows(tasks);
      res.render('pages/home', { tableRows });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.render('pages/home', {});
    }
  });

  app.get('/tasks', (_req, res) => {
    res.render('pages/create-task', { statusItems: STATUS_ITEMS });
  });

  app.get('/:id/status', (req, res) => {
    const { id } = req.params;
    res.render('pages/update-status', { id, statusItems: STATUS_ITEMS });
  });

  app.post('/create', async (req, res) => {
    const formData = req.body;
    const errors: Record<string, { text: string }> = {};
    const errorList: { text: string; href: string }[] = [];
    if (!formData.title || formData.title.trim() === '') {
      errors.title = { text: 'Enter a title for the task' };
      errorList.push({ text: 'Enter a title for the task', href: '#title' });
    }

    if (errorList.length > 0) {
      return res.render('pages/create-task', {
        errors,
        errorList,
        formData,
        statusItems: STATUS_ITEMS,
      });
    }
    try {
      await axios.post(`${BASE_URL}`, buildCreateTaskPayload(req.body), {
        headers: { 'Content-Type': 'application/json' },
      });
      res.redirect('/');
    } catch (error) {
      console.error('Error creating task:', error);
      res.render('pages/create-task', { error: 'Failed to create task', statusItems: STATUS_ITEMS });
    }
  });

  app.post('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await axios.delete(`${BASE_URL}/${id}`);
      res.redirect('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      res.redirect('/');
    }
  });

  app.post('/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      await axios.patch(
        `${BASE_URL}/${id}/status`,
        { status: req.body.status },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      res.redirect('/');
    } catch (error) {
      console.error('Error updating task status:', error);
      res.redirect('/');
    }
  });
}
