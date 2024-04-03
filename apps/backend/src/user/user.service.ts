import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db_client } from '@repo/database';

@Injectable()
export class UserService {
  async create(createUserDto: any) {
    const email_already_registered = await db_client.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (email_already_registered) {
      throw new HttpException('EMAIL_ALREADY_REGISTERED', HttpStatus.CONFLICT);
    }

    return await db_client.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<any> {
    return await db_client.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
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
        email: true,
        email_verified: true,
        roles: true,
      },
    });
  }

  update(id: string, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user_exists = await this.findOne(id);

    if (!user_exists) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return await db_client.user.delete({
      where: {
        id,
      },
    });
  }
}
