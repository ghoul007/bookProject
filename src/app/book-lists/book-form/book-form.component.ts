import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { Book } from '../../models/Book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formbuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]]
    })
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const newBook = new Book(title, author);
    if (this.fileUrl && this.fileUrl != '') {
      newBook.photo = this.fileUrl;
    }
    debugger;
    this.bookService.createNewBook(newBook);
    this.router.navigate(['/book']);
  }


  onUploadFiele(file: File) {

    this.fileUploaded = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }


  detectFile(event) {
    this.onUploadFiele(event.target.files[0]);

  }

}
