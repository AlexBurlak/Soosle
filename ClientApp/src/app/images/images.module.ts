import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { TableComponent } from './table/table.component';
import { AddComponent } from './add/add.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { routes } from './images.routes';



@NgModule({
  declarations: [
    LayoutComponent,
    TableComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ]
})
export class ImagesModule { }
