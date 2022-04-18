import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subject<void> = new Subject<void>();
  loginForm!: FormGroup;
  loading: boolean = false;
  returnUrl!: string;
  submitted: boolean = false;
  public passwordType: string = 'password';

  constructor(private translate: TranslateService,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute) {
      translate.setDefaultLang('en');
      translate.use('en');
      if (this.authService.currentToken) {
        this.router.navigate(['/']);
      }
   }
  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return false;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      }, error => {
        console.error(error);
        this.loading = false;
      })
    return true;
  }

  public togglePassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }
  public toggleLanguage() {
    if (this.translate.currentLang == 'en') {
      this.translate.use('ua');
    } else {
      this.translate.use('en');
    }
  }
}
