import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { resolve } from 'q';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  createnewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        () => {
          resolve()
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error)
        }
      )
    })
  }


  signoutUser() {
    firebase.auth().signOut();
  }


}
