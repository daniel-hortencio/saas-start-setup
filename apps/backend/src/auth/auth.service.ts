import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db_client, User } from '@repo/database';
import { AES } from 'crypto-js';
import * as encUtf8 from 'crypto-js/enc-utf8';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ access_token: string; user: Omit<User, 'password'> }> {
    const { email, password } = signInDto;

    const user = await db_client.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const decryptedPassword = AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET,
    ).toString(encUtf8);

    if (decryptedPassword !== `"${password}"`) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const { password: user_password, ...result } = user;

    const payload = { sub: user.id, ...result };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: result,
    };
  }
}
