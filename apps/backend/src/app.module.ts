import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { CreateUserModule } from './create-user/create-user.module';

@Module({
  imports: [UserModule, CategoryModule, TransactionModule, CreateUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
