import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.url}/books`);
  }

  getIssueById(id) {
    return this.http.get(`${this.url}/books/${id}`);
  }

  addIssue(title, author, description, price) {
    const issue = {
      title: title,
      author: author,
      description: description,
      price: price
    };
    return this.http.post(`${this.url}/books/add`, issue);
  }

  updateIssue(id, title, author, description, price, discount) {
    const issue = {
      title: title,
      author: author,
      description: description,
      price: price,
      discount: discount
    };
    return this.http.post(`${this.url}/books/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.get(`${this.url}/books/delete/${id}`);
  }
}

