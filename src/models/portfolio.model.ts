import { Schema, model, Document } from 'mongoose';

export interface IPortfolioItem extends Document {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

const portfolioSchema = new Schema<IPortfolioItem>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default model<IPortfolioItem>('PortfolioItem', portfolioSchema);