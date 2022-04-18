import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { RouterModule } from '@angular/router';
import { routes } from './categories.routes';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
