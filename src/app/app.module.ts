import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListsComponent } from './book-lists/book-lists.component';
import { SingleBookComponent } from './book-lists/single-book/single-book.component';
import { BookFormComponent } from './book-lists/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "auth/signup", component: SignupComponent },
  { path: "auth/signin", component: SigninComponent },
  { path: "book", component: BookListsComponent, canActivate: [AuthGuardService] },
  { path: "book/new", component: BookFormComponent, canActivate: [AuthGuardService] },
  { path: "book/view/:id", component: SingleBookComponent, canActivate: [AuthGuardService] },
  { path: "", redirectTo: 'book', pathMatch: 'full' },
  { path: "**", redirectTo: 'book' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListsComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, BooksService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
