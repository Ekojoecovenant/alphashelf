import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async findUserBook(bookId: string, userId: string) {
    const book = await this.bookRepo.findOne({
      where: {
        id: bookId,
        owner: { id: userId },
      },
      relations: ['authors', 'categories'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }
}
