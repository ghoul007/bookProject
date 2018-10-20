import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import * as firebase from 'firebase';
import { reject, resolve } from 'q';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  bookSubject = new Subject<Book[]>();
  constructor() { }

  emitBooks() {
    this.bookSubject.next(this.books)
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    })
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error)
          }
        )
      }
    )
  }

  createNewBook(book: Book) {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log("photo deleted")
        }
      ).catch((error) => {
        console.log(error)
      })
    }

    const bookIndex = this.books.findIndex((bookEl) => {
      if (book == bookEl) {
        return true;
      }
    })

    this.books.splice(bookIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }


  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const filename = Date.now().toString();
        const upload = firebase.storage().ref()
          .child("images/" + filename + file.name)
          .put(file);

        upload.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("chargement...")
          },
          (error) => {
            console.log("Error de chargement", error)
          },
          () => {
            debugger
            upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              resolve(downloadURL);
            });

          },
        )
      }
    )
  }

}
