import { User } from '@prisma/client';

export type FindUserDto = Omit<User, 'password'>;
