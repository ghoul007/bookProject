import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/Book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;
  constructor(private route: ActivatedRoute,
    private bookService: BooksService,
    private router: Router) { }

  ngOnInit() {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    )
  }


  onBack(){
    this.router.navigate(['/book'])
  }
}
