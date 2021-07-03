import { Request, Response } from 'express';
import { get } from 'lodash';
import {
  createProject,
  findProject,
  findAndUpdate,
  deleteProject,
  listProjects,
} from '../service/project.service';

export async function createProjectHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const body = req.body;

  const project = await createProject({ ...body, user: userId });

  return res.send(project);
}

export async function updateProjectHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const projectId = get(req, 'params.projectId');
  const update = req.body;

  const project = await findProject({ _id: projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  if (String(project.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedProject = await findAndUpdate({ _id: projectId }, update, {
    new: true,
  });

  return res.send(updatedProject);
}

export async function getProjectHandler(req: Request, res: Response) {
  const projectId = get(req, 'params.projectId');
  const project = await findProject({ _id: projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  return res.send(project);
}

export async function listProjectHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const projects = await listProjects({ user: userId });

  if (!projects) {
    return res.sendStatus(404);
  }

  return res.send(projects);
}

export async function deleteProjectHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const projectId = get(req, 'params.projectId');

  const project = await findProject({ _id: projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  if (String(project.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteProject({ _id: projectId });

  return res.sendStatus(200);
}
