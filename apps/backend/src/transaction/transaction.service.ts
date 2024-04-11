import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/request/create-transaction.dto';
import { UpdateTransactionDto } from './dto/request/update-transaction.dto';
import { db_client } from '@repo/database';
import { UserService } from 'src/user/user.service';
import { validateDto } from 'utils/validateDto';
import { CategoryService } from 'src/category/category.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionService {
  DB_TABLE() {
    return db_client.transaction;
  }

  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(user_id: string, createTransactionDto: CreateTransactionDto) {
    await this.userService.findOne(user_id);

    await validateDto(createTransactionDto);

    const {
      name,
      category_id = '',
      created_at,
      value,
      type,
    } = createTransactionDto;

    if (category_id) {
      await this.categoryService.findOne(user_id, category_id);
    }
    const created_transaction = await this.DB_TABLE().create({
      data: {
        name,
        user_id,
        category_id,
        created_at: new Date(created_at),
        value,
        type: [TransactionType[type]],
      },
    });

    return created_transaction;
  }

  async findAll(user_id: string) {
    await this.userService.findOne(user_id);

    const transactions = await this.DB_TABLE().findMany({
      where: {
        user_id,
      },
    });

    return transactions;
  }

  async findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
