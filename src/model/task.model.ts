import mongoose from 'mongoose';
import { UserDocument } from './user.model';
import { ProjectDocument } from './project.model';

export interface TaskDocument extends mongoose.Document {
  user: UserDocument['_id'];
  project: ProjectDocument['_id'];
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    title: { type: String },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskDocument>('Task', TaskSchema);

export default Task;
