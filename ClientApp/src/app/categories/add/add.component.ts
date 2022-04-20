import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/entities/category';
import { CategoryCreateRequest } from 'src/app/models/requests/category-create-request';
import { CategoryAddTableService } from 'src/app/services/category-add-table.service';
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
    private categoryService: CategoryService,
    private categoryAddTableService: CategoryAddTableService) { 
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
        this.categoryAddTableService.updateCategory(new Category({id:categoryId, name:this.f.name.value }));
        this.f.name.reset();
      })
  }

  ngOnInit(): void {
  }

}
