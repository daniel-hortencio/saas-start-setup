import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { db_client } from '@repo/database';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindUserDto } from 'src/user/dto/response/find-user-dto';
import { ErrorUsers } from 'src/user/errors';

@UseGuards(AuthGuard)
@Injectable()
export class AdminService {
  DB_TABLE_USER() {
    return db_client.user;
  }

  selectWithoutPassword() {
    return {
      id: true,
      name: true,
      email: true,
      email_verified: true,
      roles: true,
      created_at: true,
    };
  }

  async findUsers(): Promise<FindUserDto[]> {
    return await this.DB_TABLE_USER().findMany({
      select: this.selectWithoutPassword(),
    });
  }

  async findUserById(id: string): Promise<FindUserDto> {
    const user = await this.DB_TABLE_USER().findUnique({
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
}
