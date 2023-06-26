import { UserEntity } from '../Entity/userEntity';
import { UserModel } from '../Model/userModel';

export class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async addUser(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userModel.addUser(user);
    return createdUser;
  }

  async getUser(id: number): Promise<UserEntity | null> {
    const user = await this.userModel.getUser(id);
    return user;
  }

  async updateUser(id: number, user: UserEntity): Promise<UserEntity | null> {
    const updatedUser = await this.userModel.updateUser(id, user);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userModel.deleteUser(id);
  }
}
