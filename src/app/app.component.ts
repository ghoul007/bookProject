import { Component } from '@angular/core';
import * as firebase from "firebase";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var config = {
      apiKey: "AIzaSyDDuTW5fjg4wzxzcaoKeaw2idfkolzOmtc",
      authDomain: "books-8a8e5.firebaseapp.com",
      databaseURL: "https://books-8a8e5.firebaseio.com",
      projectId: "books-8a8e5",
      storageBucket: "",
      messagingSenderId: "1050603276987"
    };
    firebase.initializeApp(config);
  }


}
