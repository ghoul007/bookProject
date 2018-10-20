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
      //config firbase
    };
    firebase.initializeApp(config);
  }


}
