import { Response } from 'express';
import Command from '../models/command.model';
import { AuthRequest } from '../middleware/auth.middleware';

// @desc    Client creates a new command
// @route   POST /api/commands
export const createCommand = async (req: AuthRequest, res: Response) => {
  const { message } = req.body;
  const newCommand = new Command({
    message,
    user: req.user?._id, // Get user ID from the logged-in user
  });
  const createdCommand = await newCommand.save();
  res.status(201).json(createdCommand);
};

// @desc    Admin gets all commands
// @route   GET /api/commands
export const getAllCommands = async (req: AuthRequest, res: Response) => {
  // Populate with user info so admin can see who sent what
  const commands = await Command.find({}).populate('user', 'name email');
  res.json(commands);
};

export const getMyCommands = async (req: AuthRequest, res: Response) => {
  const commands = await Command.find({ user: req.user?._id });
  res.json(commands);
};

export const updateMyCommand = async (req: AuthRequest, res: Response) => {
  const { message } = req.body;
  const command = await Command.findById(req.params.id);

  if (command && command.user.toString() === req.user?._id.toString()) {
    command.message = message || command.message;
    const updatedCommand = await command.save();
    res.json(updatedCommand);
  } else {
    res.status(404).json({ message: 'Command not found or not authorized' });
  }
};

// @desc    Admin updates a command's status
// @route   PUT /api/commands/:id/status
export const updateCommandStatus = async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const command = await Command.findById(req.params.id);

  if (command) {
    command.status = status || command.status;
    const updatedCommand = await command.save();
    res.json(updatedCommand);
  } else {
    res.status(404).json({ message: 'Command not found' });
  }
};

export const createCommandWithFile = async (req: AuthRequest, res: Response) => {
  const { message } = req.body;
  const fileUrl = req.file?.path; // Get secure URL from Cloudinary
  const fileName = req.file?.originalname; // Get the original name of the file

  if (!message) {
      return res.status(400).json({ message: 'Message is required.' });
  }

  try {
      const newCommand = new Command({
          message,
          fileUrl, // Can be undefined if no file is attached
          fileName,
          user: req.user?._id,
      });

      const createdCommand = await newCommand.save();
      res.status(201).json(createdCommand);

  } catch (error) {
      res.status(500).json({ message: 'Server error while creating command.' });
  }
};

export const deleteMyCommand = async (req: AuthRequest, res: Response) => {
  try {
    const command = await Command.findById(req.params.id);

    // Security check: Ensure the command exists, belongs to the logged-in user, AND is pending
    if (command && command.user.toString() === req.user?._id.toString() && command.status === 'pending') {
      await command.deleteOne();
      res.json({ message: 'Command removed successfully' });
    } else {
      res.status(404).json({ message: 'Command not found, not authorized, or is no longer pending.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};