import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the connection string
 * from the environment variables.
 */
export const connectDB = async () => {
  try {
    // Assert that MONGO_URI is a string, as TypeScript can't know this from .env
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    
    // Log a success message to the console
    console.log(`[database]: MongoDB Connected successfully on host: ${conn.connection.host}`);
  } catch (error: any) {
    // Log a detailed error message and exit the process if the connection fails
    console.error(`[database]: MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};