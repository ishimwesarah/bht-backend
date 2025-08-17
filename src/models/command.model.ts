import { Schema, model, Document, Types } from 'mongoose';

export interface ICommand extends Document {
  user: Types.ObjectId;
  message: string;
  status: 'pending' | 'in-progress' | 'completed';
  fileUrl?: string; // <-- 1. ADD NEW OPTIONAL FIELD
  fileName?: string; // <-- Add filename for better UX
}

const commandSchema = new Schema<ICommand>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  fileUrl: { type: String }, // <-- 2. ADD TO SCHEMA
  fileName: { type: String }, // <-- ADD TO SCHEMA
}, { timestamps: true });

export default model<ICommand>('Command', commandSchema);