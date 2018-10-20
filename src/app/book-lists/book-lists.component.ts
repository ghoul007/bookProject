import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-lists',
  templateUrl: './book-lists.component.html',
  styleUrls: ['./book-lists.component.scss']
})
export class BookListsComponent implements OnInit, OnDestroy {


  books: Book[];
  bookSubscription: Subscription;
  constructor(private booService: BooksService, private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.booService.bookSubject.subscribe(
      (book: Book[]) => {
        this.books = book;
      }
    )
    this.booService.getBooks();
    this.booService.emitBooks();
  }


  onNewBook() {
    this.router.navigate(['/book', 'new'])
  }


  onDeleteBook(book: Book) {
    this.booService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/book', 'view', id])
  }


  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }


}
