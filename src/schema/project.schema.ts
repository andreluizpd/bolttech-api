import { object, string } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
  }),
};

const params = {
  params: object({
    projectId: string().required('ProjectID is required'),
  }),
};

export const createProjectSchema = object({
  ...payload,
});

export const updateProjectSchema = object({
  ...params,
  ...payload,
});

export const deleteProjectSchema = object({
  ...params,
});
