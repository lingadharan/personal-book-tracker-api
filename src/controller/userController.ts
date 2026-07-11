import type { Request, Response } from 'express';
import UserService from '../service/userService.js';

export default class UserController {
  async createUserDetails(req: Request, res: Response): Promise<any> {
    const { userName, emailId, password } = req.body;

    // Validate request body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required.',
      });
    }

    // Required field validation
    if (!userName || !emailId || !password) {
      return res.status(400).json({
        success: false,
        message: 'userName, emailId and password are required.',
      });
    }

    // Type validation
    if (
      typeof userName !== 'string' ||
      typeof emailId !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message: 'userName, emailId and password must be strings.',
      });
    }

    try {
      const service = new UserService();

      const result = await service.createUserDetails({
        userName,
        emailId,
        password,
      });

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error in UserController.createUserDetails:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to create user.',
        error,
      });
    }
  }
}
