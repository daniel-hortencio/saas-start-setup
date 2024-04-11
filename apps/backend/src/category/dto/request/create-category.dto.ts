import { TransactionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  color: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
