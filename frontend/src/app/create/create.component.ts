import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import * as M from 'materialize-css/dist/js/materialize';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      unitPurchaseHtPrice: ['', Validators.required],
      unitRetailHtPrice: ['', Validators.required],
      discount: 0,
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      condition: ['Neuf', Validators.required]
    });
  }

  addBook(
    title,
    author,
    description,
    unitPurchaseHtPrice,
    unitRetailHtPrice,
    discount,
    quantity,
    category,
    condition
  ) {
    this.bookService
      .addBook(
        title,
        author,
        description,
        unitPurchaseHtPrice,
        unitRetailHtPrice,
        discount,
        quantity,
        category,
        condition,
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  ngOnInit() {
    $(document).ready(function () {
      $('input#input_text, textarea#textarea2').characterCounter();
      $('select').formSelect();
      $('.materialboxed').materialbox();
      $('.collapsible').collapsible();
      M.updateTextFields();
    });
  }
}
