import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { PagenofoundComponent } from './pagenofound/pagenofound.component';
import { BookService } from './book.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListBooksComponent,
    CreateComponent,
    EditComponent,
    PagenofoundComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule {}
