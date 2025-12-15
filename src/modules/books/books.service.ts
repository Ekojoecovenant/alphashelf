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

  /**
   * Fetch a single book owned by a specific user
   * Ownership is enforced at query level
   */
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

  /**
   * Create a book and bind ownership to user
   */
  async createBook(userId: string, data: Partial<Book>) {
    const book = this.bookRepo.create({
      ...data,
      owner: { id: userId },
    });

    return this.bookRepo.save(book);
  }
}
