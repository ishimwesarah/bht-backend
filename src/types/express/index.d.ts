// This file uses "declaration merging" to add a 'file' property to the global Express Request type.
// This is the standard, professional way to handle this in TypeScript.

declare namespace Express {
  export interface Request {
    file?: Multer.File; // This tells TypeScript that a 'file' property might exist on the Request object.
  }
}