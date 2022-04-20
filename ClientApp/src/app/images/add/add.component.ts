import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public form: FormGroup;
  public categories!: Observable<Category[]>;
  constructor(private builder: FormBuilder,
    private categoryService: CategoryService) {
    this.form = builder.group({
      'Name': [''],
      'CategoryId': [],
      'File': ['']
    });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getAll();
  }

}
