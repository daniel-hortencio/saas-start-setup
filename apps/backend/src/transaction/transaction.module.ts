import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, UserService, CategoryService],
})
export class TransactionModule {}
