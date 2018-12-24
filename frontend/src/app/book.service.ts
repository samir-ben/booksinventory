import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(`${this.url}/books`);
  }

  getBookById(id) {
    return this.http.get(`${this.url}/books/${id}`);
  }

  addBook(title, author, description, unitPurchaseHtPrice, unitRetailHtPrice, discount, quantity, category, condition) {
    const book = {
      title: title,
      author: author,
      description: description,
      unitPurchaseHtPrice: unitPurchaseHtPrice,
      unitRetailHtPrice: unitRetailHtPrice,
      discount: discount,
      quantity: quantity,
      category: category,
      condition: condition,
    };
    return this.http.post(`${this.url}/books/add`, book);
  }

  updateBook(id, title, author, description, unitPurchaseHtPrice, unitRetailHtPrice, discount, quantity, category, condition) {
    const book = {
      title: title,
      author: author,
      description: description,
      unitPurchaseHtPrice: unitPurchaseHtPrice,
      unitRetailHtPrice: unitRetailHtPrice,
      discount: discount,
      quantity: quantity,
      category: category,
      condition: condition
    };
    return this.http.post(`${this.url}/books/update/${id}`, book);
  }

  deleteBook(id) {
    return this.http.get(`${this.url}/books/delete/${id}`);
  }
  search(term: string): Observable<Book[]> {
    console.log('search');
    return this.http
      .get<Book[]>(`${this.url}/books`)
      .pipe(
        map(res => res.filter(
          evt => evt.title.toLowerCase().indexOf(term) > -1 || evt.description.toLowerCase().indexOf(term) > -1 )
          ),
        tap(eventFiltered => console.log('Event filtered', eventFiltered))
      )
      ;
  }
}

