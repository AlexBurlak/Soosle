import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { TableComponent } from './table/table.component';
import { AddComponent } from './add/add.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { routes } from './images.routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    LayoutComponent,
    TableComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ImagesModule { }
