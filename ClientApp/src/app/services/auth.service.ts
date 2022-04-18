import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginResponse } from '../models/responses/login-response';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url!: string;
  private currentTokenSubject: BehaviorSubject<string | null>;
  public currentToken: Observable<string | null>;
  private logged: boolean = false;

  constructor(private http: HttpClient) { 
    this.currentTokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
    this.currentToken = this.currentTokenSubject.asObservable();
    this.url = environment.url + '/Account';
  }

  login(login: string, password: string) {
    return this.http.post<any>(this.url + '/login', {login, password})
      .pipe(map((response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('token-expiration', response.expiration.toString());
        this.currentTokenSubject.next(response.token);
        this.logged = true;
        return response;
      }))
  } 
}
