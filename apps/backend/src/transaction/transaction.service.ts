import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/request/create-transaction.dto';
import { UpdateTransactionDto } from './dto/request/update-transaction.dto';
import { db_client } from '@repo/database';
import { UserService } from 'src/user/user.service';
import { validateDto } from 'utils/validateDto';
import { CategoryService } from 'src/category/category.service';
import { TransactionType } from '@prisma/client';
import { ErrorTransactions } from './errors';

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

    const { name, category_id = '', date, value, type } = createTransactionDto;

    if (category_id) {
      await this.categoryService.findOne(user_id, category_id);
    }
    const created_transaction = await this.DB_TABLE().create({
      data: {
        name,
        user_id,
        category_id,
        date: new Date(date),
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

  async findOne(user_id: string, transaction_id: string) {
    await this.userService.findOne(user_id);

    const transaction = await this.DB_TABLE().findFirst({
      where: {
        user_id,
        id: transaction_id,
      },
    });

    if (!transaction) {
      throw new HttpException(
        ErrorTransactions.TRANSACTION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return transaction;
  }

  async update(
    user_id: string,
    transaction_id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.findOne(user_id, transaction_id);

    await validateDto(updateTransactionDto);

    const { name, date, value, category_id = '' } = updateTransactionDto;

    const data: any = {
      name,
      date,
      value,
    };

    if (category_id) {
      const category_exists = await db_client.category.findFirst({
        where: { user_id, id: category_id },
      });

      if (
        category_exists &&
        JSON.stringify(category_exists.type) ===
          JSON.stringify(transaction.type)
      ) {
        data.category_id = category_exists?.id;
      }
    }

    const updated_transaction = await this.DB_TABLE().update({
      where: {
        user_id,
        id: transaction_id,
      },
      data,
    });

    return updated_transaction;
  }

  async remove(user_id: string, transaction_id: string) {
    await this.findOne(user_id, transaction_id);

    const deleted_transaction = await this.DB_TABLE().delete({
      where: {
        user_id,
        id: transaction_id,
      },
    });

    return deleted_transaction;
  }
}
