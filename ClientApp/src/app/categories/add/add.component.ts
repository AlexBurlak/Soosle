import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  onSubmit() {
    this.categoryService.add()
      .pipe(takeUntil(this.subscriptions))
  }

  ngOnInit(): void {
  }

}
