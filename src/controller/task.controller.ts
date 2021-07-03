import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  createTask,
  findTask,
  findAndUpdate,
  listTasks,
  deleteTask,
} from '../service/task.service';

export async function createTaskHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const { projectId, ...body } = req.body;

  console.log('body: ', body);
  console.log('projectId: ', projectId);

  const task = await createTask({
    ...body,
    user: userId,
    project: projectId,
  });

  return res.send(task);
}

export async function updateTaskHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const taskId = get(req, 'params.taskId');
  const { projectId, ...body } = req.body;

  const task = await findTask({ _id: taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  if (task.completed) {
    return res.sendStatus(401);
  }

  if (String(task.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedTask = await findAndUpdate({ _id: taskId }, body, {
    new: true,
  });

  return res.send(updatedTask);
}

export async function listTaskHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const projectId = get(req, 'params.projectId');
  const tasks = await listTasks({ user: userId, project: projectId });

  if (!tasks) {
    return res.sendStatus(404);
  }

  return res.send(tasks);
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const taskId = get(req, 'params.taskId');

  const task = await findTask({ _id: taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  if (task.completed) {
    return res.sendStatus(401);
  }

  if (String(task.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteTask({ _id: taskId });

  return res.sendStatus(200);
}
