import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { Error } from '../errors';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @Headers('user_id') user_id: string,
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.categoryService.create(user_id, createCategoryDto);
  }

  @Get()
  async findAll(@Headers('user_id') user_id: string) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.categoryService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Headers('user_id') user_id: string, @Param('id') id: string) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.categoryService.findOne(user_id, id);
  }

  @Patch(':id')
  update(
    @Headers('user_id') user_id: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
  ) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.categoryService.update(user_id, id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Headers('user_id') user_id: string, @Param('id') id: string) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.categoryService.remove(user_id, id);
  }
}
