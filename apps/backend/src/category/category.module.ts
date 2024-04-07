import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, UserService],
})
export class CategoryModule {}
