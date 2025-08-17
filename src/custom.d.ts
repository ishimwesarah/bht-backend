// This file extends the global Express namespace.

import { IUser } from './models/user.model';

// This is the magic part. It tells TypeScript that the global Express
// Request interface can now have these optional properties.
declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
      // Because we installed @types/multer, TypeScript now knows what 'Multer.File' is.
      file?: Multer.File; 
    }
  }
}