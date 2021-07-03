import { Express, Request, Response } from 'express';
import {
  createProjectHandler,
  updateProjectHandler,
  getProjectHandler,
  deleteProjectHandler,
  listProjectHandler,
} from './controller/project.controller';
import { createUserHandler } from './controller/user.controller';
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from './controller/session.controller';
import { validateRequest, requiresUser } from './middleware';
import {
  createUserSchema,
  createUserSessionSchema,
} from './schema/user.schema';
import {
  createProjectSchema,
  updateProjectSchema,
  deleteProjectSchema,
} from './schema/project.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    '/api/sessions',
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get('/api/sessions', requiresUser, getUserSessionsHandler);

  // Logout
  app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

  // Create a Project
  app.post(
    '/api/projects',
    [requiresUser, validateRequest(createProjectSchema)],
    createProjectHandler
  );

  // Update a Project
  app.put(
    '/api/projects/:projectId',
    [requiresUser, validateRequest(updateProjectSchema)],
    updateProjectHandler
  );

  // Get a Project
  app.get('/api/projects/:projectId', getProjectHandler);

  // List Projects
  app.get('/api/projects', listProjectHandler);

  // // Delete a Project
  app.delete(
    '/api/projects/:projectId',
    [requiresUser, validateRequest(deleteProjectSchema)],
    deleteProjectHandler
  );
}
