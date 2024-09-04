/* // src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db_client } from '@repo/database';
import * as AES from 'crypto-js/aes';
import * as encUtf8 from 'crypto-js/enc-utf8'; // Import para decodificação em UTF-8

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await db_client.user.findFirst({
      where: { email },
    }); // Busca usuário por email

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Descriptografar a senha armazenada no banco de dados
    const decryptedPassword = AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET,
    ).toString(encUtf8);

    // Verifica se a senha fornecida corresponde à senha descriptografada
    if (decryptedPassword !== password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const { password: userPassword, ...result } = user;
    return result; // Retorna o usuário sem o password
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db_client } from '@repo/database';
import { AES } from 'crypto-js';
import * as encUtf8 from 'crypto-js/enc-utf8';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { email, password } = signInDto;

    console.log({ email, password });
    const user = await db_client.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Descriptografar a senha armazenada no banco de dados
    const decryptedPassword = AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET,
    ).toString(encUtf8);

    console.log({ decryptedPassword });

    // Verifica se a senha fornecida corresponde à senha descriptografada
    if (decryptedPassword !== `"${password}"`) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    /*     if (user?.password !== password) {
      throw new UnauthorizedException();
    } */
    const { password: user_password, ...result } = user;

    const payload = { sub: user.id, ...result };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
