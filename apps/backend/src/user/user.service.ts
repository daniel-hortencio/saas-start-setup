import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db_client } from '@repo/database';
import { ErrorUsers } from './errors';
import { CreateUserDto } from './dto/request/create-user-dto';
import { UpdateUserDto } from './dto/request/update-user-dto';
import { FindUserDto } from './dto/response/find-user-dto';
import { validateDto } from 'utils/validateDto';

@Injectable()
export class UserService {
  selectWithoutPassword() {
    return {
      id: true,
      name: true,
      email: true,
      email_verified: true,
      roles: true,
    };
  }

  async create(createUserDto: CreateUserDto) {
    await validateDto(createUserDto);

    const { email, name, password } = createUserDto;

    const email_already_registered = await db_client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (email_already_registered) {
      throw new HttpException(
        ErrorUsers.EMAIL_ALREADY_REGISTERED,
        HttpStatus.CONFLICT,
      );
    }

    const created_user = await db_client.user.create({
      data: { email, name, password },
    });

    return { ...created_user, password: undefined };
  }

  async findAll(): Promise<FindUserDto[]> {
    return await db_client.user.findMany({
      select: this.selectWithoutPassword(),
    });
  }

  async findOne(id: string): Promise<FindUserDto> {
    const user = await db_client.user.findUnique({
      where: {
        id,
      },
      select: this.selectWithoutPassword(),
    });

    if (!user) {
      throw new HttpException(ErrorUsers.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await validateDto(updateUserDto);

    const { name, password } = updateUserDto;

    const user_exists = await this.findOne(id);

    if (!user_exists) {
      throw new HttpException(ErrorUsers.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const updated_user = await db_client.user.update({
      where: {
        id,
      },
      data: { name, password },
    });

    return { ...updated_user, password: undefined };
  }

  async remove(id: string) {
    const user_exists = await this.findOne(id);

    if (!user_exists) {
      throw new HttpException(ErrorUsers.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return await db_client.user.delete({
      where: {
        id,
      },
    });
  }
}
