import { Injectable } from '@nestjs/common';
import { db_client } from '@repo/database';

@Injectable()
export class UserService {
  create(createUserDto: any) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<any> {
    return await db_client.user.findMany({
      select: {
        id: true,
        name: true,
        email_verified: true,
        roles: true,
      },
    });
  }

  async findOne(id: string): Promise<any> {
    return await db_client.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email_verified: true,
        roles: true,
      },
    });
  }

  update(id: string, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
