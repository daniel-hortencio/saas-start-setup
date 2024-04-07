import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

enum TransactionType {
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
}

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

  @IsString()
  @IsNotEmpty()
  @IsEnum({
    REVENUE: 'REVENUE',
    EXPENSE: 'EXPENSE',
  })
  type: string;
}
