import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  updateForm: FormGroup;
  book: any = {};
  id: String;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      unitPurchaseHtPrice: ['', Validators.required],
      unitRetailHtPrice: ['', Validators.required],
      discount: 0,
      quantity: [1, Validators.required],
      category: ['', Validators.required],
      condition: ['Neuf', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.bookService.getBookById(this.id).subscribe(res => {
        this.book = res;
        this.updateForm.get('title').setValue(this.book.title);
        this.updateForm.get('author').setValue(this.book.author);
        this.updateForm.get('description').setValue(this.book.description);
        this.updateForm
          .get('unitPurchaseHtPrice')
          .setValue(this.book.unitPurchaseHtPrice);
        this.updateForm
          .get('unitRetailHtPrice')
          .setValue(this.book.unitRetailHtPrice);
        this.updateForm.get('discount').setValue(this.book.discount);
        this.updateForm.get('quantity').setValue(this.book.quantity);
        this.updateForm.get('category').setValue(this.book.category);
        this.updateForm.get('condition').setValue(this.book.condition);
      });
    });
  }

  updateBook(
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
      .updateBook(
        this.id,
        title,
        author,
        description,
        unitPurchaseHtPrice,
        unitRetailHtPrice,
        discount,
        quantity,
        category,
        condition
      )
      .subscribe(() => {
        M.toast({ html: 'Modifications éffectuées' });
      });
  }
}
