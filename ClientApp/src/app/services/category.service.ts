import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/entities/category';
import { CategoryCreateRequest } from '../models/requests/category-create-request';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.url + '/Category';
  }

  public add(request: CategoryCreateRequest) {
    return this.http.post<any>(this.url + '/Create', request);
  }

  public getAll() {
    return this.http.get<Category[]>(this.url + '/get-all');
  }

  public delete(id: string) {
    return this.http.delete<any>(this.url + '/delete', { body: {id: id} });
  }
}
