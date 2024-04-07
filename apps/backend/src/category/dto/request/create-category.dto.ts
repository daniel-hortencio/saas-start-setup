import { IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  @Length(6)
  color: string;
}
