import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface ProjectDocument extends mongoose.Document {
  user: UserDocument['_id'];
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, default: true },
  },
  { timestamps: true }
);

const Project = mongoose.model<ProjectDocument>('Project', ProjectSchema);

export default Project;
