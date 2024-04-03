import { Injectable } from '@nestjs/common';
import { db_client } from '@repo/database';

@Injectable()
export class UserService {
  create(createUserDto: any) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<any> {
    return await db_client.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
