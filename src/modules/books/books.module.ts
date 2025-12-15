import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService],
  exports: [BookService],
})
export class BooksModule {}
