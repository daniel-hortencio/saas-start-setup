import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import 'reflect-metadata';

export async function validateDto<T>(dto: T): Promise<void> {
  const errors = await validate(dto as object);
  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }
}
