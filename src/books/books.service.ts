import { Book } from './book.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  public async getPrivateBooks(): Promise<Book[]> {
    return await this.bookRepository.find({ visibility: false });
  }

  public async getPublicBooks(): Promise<Book[]> {
    return await this.bookRepository.find({ visibility: true });
  }
}
