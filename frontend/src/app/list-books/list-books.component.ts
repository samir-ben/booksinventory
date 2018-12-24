import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  books: Book[];
  searchTerm = new FormControl();
  searchTerms$: Observable<string> = this.searchTerm.valueChanges;
  result: Book[] = [];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.fetchBooks();
    this.searchTerms$
      .pipe(
        debounceTime(1000),
        switchMap(rq => this.bookService.search(rq.toLowerCase())),
        tap(x => console.log(x))
      )
      .subscribe(term => this.result = term);
  }

  fetchBooks() {
    this.bookService
      .getBooks()
      .subscribe((data: Book[]) => {
        this.books = data;
        console.log('Data requested ...');
        console.log(this.books);
      });
  }

  editBook(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteBook(id) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.fetchBooks();
    });
  }
  getRetailPriceWithTaxes(value) {
    return value * 1.2;
  }

  getStorageCost(value1, value2) {
    return value1 * value2;
  }

  getPriceWithDiscount(value1, value2) {
    return value1 - (value1 * value2 / 100) ;
  }

}
