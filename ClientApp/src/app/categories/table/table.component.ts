import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();
  subscriptions: Subject<void> = new Subject<void>();
  constructor(private categoryService: CategoryService) { 

  }
  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.categoryService.getAll()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(c => {this.dataSource.data = c; console.log(this.dataSource.data); });
  }

}
