import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/entities/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryAddTableService {
  private categoryState = new BehaviorSubject<Category[]>([]);
  currentCategory = this.categoryState.asObservable();
  constructor() { }
  updateCategory(category: Category) {
    this.categoryState.next(this.categoryState.getValue().concat(category));
  }
  updateCategories(categories: Category[]) {
    this.categoryState.next(categories);
  }
}
