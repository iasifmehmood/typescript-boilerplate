import { Request, Response } from 'express';
import { UserEntity } from '../Entity/userEntity';
import { UserDTO } from '../DTO/UserDTO';
import { UserService } from '../Services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body as UserDTO;
      const user: UserEntity = { name, email, password };

      const createdUser = await this.userService.addUser(user);

      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add user' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await this.userService.getUser(userId);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      const { name, email, password } = req.body as UserDTO;
      const user: UserEntity = { name, email, password };

      const updatedUser = await this.userService.updateUser(userId, user);

      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      await this.userService.deleteUser(userId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}
