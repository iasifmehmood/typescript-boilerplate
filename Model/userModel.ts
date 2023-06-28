import { HashPassword } from '../Decorators/hashPassDecorator';
import { UserEntity } from '../Entity/userEntity';
import logger from '../Logger/logger';
import QueryDB from '../Providers/DatabaseProvider';

export class UserModel {
  @HashPassword
  async addUser(user: UserEntity): Promise<UserEntity> {
    const { name, email, password } = user;

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, password];

    try {
      let result = await QueryDB(query, values);

      const insertedId = (result as any).insertId as number; //solves issue of insertid
      return { id: insertedId, ...user }; //user contains name,email and password
    } catch (error) {
      throw new Error('Failed to add user');
    }
  }

  @HashPassword
  async updateUser(id: number, user: UserEntity): Promise<UserEntity | null> {
    const { name, email, password } = user;
    const query =
      'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    const values = [name, email, password, id];

    try {
      await QueryDB(query, values);
      return { id, ...user };
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  async getUser(id: number): Promise<UserEntity | null> {
    const query = 'SELECT * FROM users WHERE id = ?';
    const values = [id];

    try {
      let rows = await QueryDB(query, values);
      // console.log(rows[0]);

      if (!Array.isArray(rows) || rows.length === 0) {
        return null;
      } //solve error
      const user = rows[0] as UserEntity; //row[0] contains id,nameemail and password
      return user;
    } catch (error) {
      throw new Error('Failed to get user');
    }
  }

  async deleteUser(id: number): Promise<void> {
    const query = 'DELETE FROM users WHERE id = ?';
    const values = [id];

    try {
      const deleteUser = await QueryDB(query, values);
      logger.info('deleteuser', deleteUser);
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}
