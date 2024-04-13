import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/request/create-transaction.dto';
import { UpdateTransactionDto } from './dto/request/update-transaction.dto';
import { Error } from '../errors';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @Headers('user_id') user_id: string,
    @Body(new ValidationPipe())
    createTransactionDto: CreateTransactionDto,
  ) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.transactionService.create(user_id, createTransactionDto);
  }

  @Get()
  findAll(@Headers('user_id') user_id: string) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.transactionService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Headers('user_id') user_id: string, @Param('id') id: string) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.transactionService.findOne(user_id, id);
  }

  @Patch(':id')
  update(
    @Headers('user_id') user_id: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTransactionDto: UpdateTransactionDto,
  ) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.transactionService.update(user_id, id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Headers('user_id') user_id: string, @Param('id') id: string) {
    if (!user_id) {
      throw new HttpException(
        Error.USER_ID_NOT_PROVIDED_IN_HEADER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.transactionService.remove(user_id, id);
  }
}
