import { object, string, boolean } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
    description: string().required('Title is required'),
    projectId: string().required('Project ID is required'),
  }),
};

const params = {
  params: object({
    taskId: string().required('TaskID is required'),
  }),
};

export const createTaskSchema = object({
  ...payload,
});

export const updateTaskSchema = object({
  ...params,
  ...payload,
});

export const deleteTaskSchema = object({
  ...params,
});
