import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { UserService } from 'src/user/user.service';
import { db_client } from '@repo/database';
import { TransactionType } from '@prisma/client';
import { ErrorCategories } from './errors';
import { validateDto } from 'utils/validateDto';

@Injectable()
export class CategoryService {
  DB_TABLE() {
    return db_client.category;
  }
  constructor(private readonly userService: UserService) {}

  async create(user_id: string, createCategoryDto: CreateCategoryDto) {
    await this.userService.findOne(user_id);
    await validateDto(createCategoryDto);

    const { color, icon, name, type } = createCategoryDto;

    const created_category = await this.DB_TABLE().create({
      data: {
        color,
        icon,
        name,
        user_id,
        type: [TransactionType[type]],
      },
    });

    return created_category;
  }

  async findAll(user_id: string) {
    const categories = await this.DB_TABLE().findMany({
      where: {
        user_id,
      },
    });

    return categories.map((c) => ({
      ...c,
      type: c.type[0],
    }));
  }

  async findOne(user_id: string, category_id: string) {
    const category = await this.DB_TABLE().findFirst({
      where: {
        user_id,
        id: category_id,
      },
    });

    if (!category) {
      throw new HttpException(
        ErrorCategories.CATEGORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return { ...category, type: category.type[0] };
  }

  async update(
    user_id: string,
    category_id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await validateDto(updateCategoryDto);

    const { name, color, icon } = updateCategoryDto;

    const updated_category = await this.DB_TABLE().update({
      where: {
        user_id,
        id: category_id,
      },
      data: {
        name,
        color,
        icon,
      },
    });

    return updated_category;
  }

  async remove(user_id: string, category_id: string) {
    const deleted_category = await this.DB_TABLE().delete({
      where: {
        user_id,
        id: category_id,
      },
    });

    return deleted_category;
  }
}
