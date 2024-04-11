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
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/request/create-transaction.dto';
import { UpdateTransactionDto } from './dto/request/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @Headers('user_id') user_id: string,
    @Body(new ValidationPipe())
    createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(user_id, createTransactionDto);
  }

  @Get()
  findAll(@Headers('user_id') user_id: string) {
    return this.transactionService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Headers('user_id') user_id: string, @Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Headers('user_id') user_id: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Headers('user_id') user_id: string, @Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
