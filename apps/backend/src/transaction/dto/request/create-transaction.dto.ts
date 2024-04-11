import { TransactionType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType[];

  @IsDate()
  @IsNotEmpty()
  created_at: Date;
}
