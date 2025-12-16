import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { AuthModule } from '../auth/auth.module';
import { BooksController } from './books.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
