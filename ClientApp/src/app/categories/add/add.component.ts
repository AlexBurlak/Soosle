import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryCreateRequest } from 'src/app/models/requests/category-create-request';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  subscriptions: Subject<void> = new Subject<void>();
  form: FormGroup;

  constructor(private builder: FormBuilder,
    private categoryService: CategoryService) { 
    this.form = builder.group({
      'name': ['', Validators.required]
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.categoryService.add(new CategoryCreateRequest({name: this.f.name.value}))
      .pipe(takeUntil(this.subscriptions))
      .subscribe(categoryId => {

      })
  }

  ngOnInit(): void {
  }

}
