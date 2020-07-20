import { BookRo } from './books.ro';
import { BooksService } from './books.service';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Get,
  Response,
  Body,
  HttpStatus,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  // get private books
  @UseGuards(AuthGuard('jwt'))
  @Get('/private')
  public async getPrivateBooks(@Response() res) {
    const result = await this.booksService.getPrivateBooks();

    if (result.length === 0) {
      throw new HttpException('Books was not Found', HttpStatus.NO_CONTENT);
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(AuthGuard('jwt'))
  // get public books
  @Get('/public')
  public async getPublicBooks(@Response() res) {
    const result = await this.booksService.getPublicBooks();
    if (result.length === 0) {
      throw new HttpException('Books was not Found', HttpStatus.NO_CONTENT);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
