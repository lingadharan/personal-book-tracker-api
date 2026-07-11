import UserRepository from '../repository/userRepository.js';

export default class UserService {
  async createUserDetails(body: any): Promise<any> {
    try {
      const repository = new UserRepository();
      return await repository.createUserDetails(body);
    } catch (error) {
      console.error('Error in UserService.createUserDetails:', error);
      throw error;
    }
  }
}
