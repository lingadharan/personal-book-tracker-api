import User from '../models/user.js';

export default class UserRepository {
  async createUserDetails(body: any): Promise<any> {
    return await User.insertOne(body);
  }
}
