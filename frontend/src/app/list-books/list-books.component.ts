import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, tap, switchMap } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


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

  constructor(private bookService: BookService, private router: Router) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  MyDataSource: any;
  bookList: Book[];
  id: any;

  displayedColumns = [
    'Titre',
    'Auteur',
    'PAHT unitaire',
    'PVHT unitaire',
    'PVTTC unitaire',
    'Coût stock total',
    'Réduction (%)',
    'PVTTC après réduction',
    'Quantité',
    'Catégorie',
    'Etat',
    'Actions'
  ];

  ngOnInit() {
    this.fetchBooks();
    this.searchTerms$
      .pipe( debounceTime(1000), switchMap(rq =>
          this.bookService.search(rq.toLowerCase())
        ), tap(x => console.log(x)) )
      .subscribe(term => (this.MyDataSource = term));
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      console.log(this.books);
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource.data = data;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
      this.books = this.MyDataSource;
      this.id = this.MyDataSource._data;
      console.log('id', this.id);
    });
  }

  editBook(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteBook(id) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.fetchBooks();
      this.result = [];
      this.searchTerm.setValue('');
    });
  }
  getRetailPriceWithTaxes(value) {
    return value * 1.2;
  }

  getStorageCost(value1, value2) {
    return value1 * value2;
  }

  getPriceWithDiscount(value1, value2) {
    return value1 - (value1 * value2) / 100;
  }
}
