import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/entities/category';
import { CategoryAddTableService } from 'src/app/services/category-add-table.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();
  subscriptions: Subject<void> = new Subject<void>();
  constructor(private categoryService: CategoryService,
    private categoryAddTableService: CategoryAddTableService) { 
      this.categoryAddTableService.currentCategory
        .pipe(takeUntil(this.subscriptions))
        .subscribe(c => this.dataSource.data = c); 
  }
  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.refreshCategories();
  }

  refreshCategories() {
    this.categoryService.getAll()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(c => {this.categoryAddTableService.updateCategories(c);});
  }

  deleteCategory(id: string): void {
    this.categoryService.delete(id)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(c => this.refreshCategories());
  }
}
