import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { sendCredentialsEmail } from '../utils/mailer';

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
};

// @desc    Login user & get token
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id.toString(), // Convert ObjectId to string
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Admin creates a new user
// @route   POST /api/auth/users
export const createUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  try {
    const userExists: IUser | null = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const initialPassword = Math.random().toString(36).slice(-8);

    const user: IUser = await User.create({
      name,
      email,
      role,
      password: initialPassword,
    });

    if (user) {
      await sendCredentialsEmail(email, initialPassword);
      res.status(201).json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Admin deletes a user
// @route   DELETE /api/auth/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// @desc    Admin gets all users
// @route   GET /api/auth/users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
