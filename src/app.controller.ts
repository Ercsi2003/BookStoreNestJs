import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Book } from './book';
import { NotFoundError } from 'rxjs';
import { CreateBookDto } from './CreateBookDto';
import { UpdateBookDto } from './UpdateBookDto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  books: Book[] = [
    {
      id: 1,
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'J.K Rowling',
      isbn: '0-2827-8552-3',
      publishYear: 1999,
      reserved: false,
    },
    {
      id: 2,
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
      isbn: '0-2040-7999-3',
      publishYear: 2008,
      reserved: true,
    },
    {
      id: 3,
      title: 'A Game of Thrones',
      author: 'George R. R. Martin',
      isbn: '0-5744-7043-3',
      publishYear: 1996,
      reserved: true,
    },
    {
      id: 4,
      title: 'The Vampire Diaries: The Awakening',
      author: 'Lisa Jane Smith',
      isbn: '0-6933-4759-7',
      publishYear: 1991,
      reserved: false,
    },
    {
      id: 5,
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '0-7294-5282-4',
      publishYear: 1965,
      reserved: false,
    },
  ];
  nextID = 6;

  @Get('books')
  listBooks() {
    return this.books;
  }

  @Get('books/:id')
  showBooksById(@Param('bookid') id: string) {
    const idNumber = parseInt(id);
    const book = this.books.find(book => book.id == idNumber);
    if (!book) {
      throw new NotFoundException("No book with this ID in our library!")
    }
    return book;
  }

  @Delete('books/:id')
  @HttpCode(204)
  deleteBooksById(@Param('bookId') id: string) {
    const idNumber = parseInt(id);
    const idx = this.books.findIndex(book => book.id == idNumber);
    if(idx == -1) {
      throw new NotFoundException("No book with this ID in our library!")
    }
    this.books.splice(idx);
  }

  @Post('books')
  @HttpCode(201)
  newBook(@Body() newBookData: CreateBookDto) {
    const newBook: Book = {
      ...newBookData,
      id: this.nextID,
    }
    this.nextID++;
    this.books.push(newBook);
    return newBook;
  }

  @Patch('books/:id')
  @HttpCode(200)
  bookModifier(@Param('bookId') id: string, @Body() bookData: UpdateBookDto) {
    const idNumber = parseInt(id);
    const originalBookID = this.books.findIndex(book => book.id == idNumber);
    if (originalBookID == -1) {
      throw new NotFoundException("No book with this ID in our library!");
    }


    
  }


}
