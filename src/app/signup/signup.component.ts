import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupModel } from '../interfaces/signup-model';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupData: SignupModel = {
    sub: null,
    error: null,
    loading: false,
    data: {
        first_name: null,
        last_name: null,
        email: null,
        password: null
    }
  }

  constructor(
    private _utils: UtilsService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._utils.page.next('signup');
  }

  ngOnDestroy(): void {
    this._utils.page.next('');
  }

  signUp() {
    this.signupData.data = this._utils.trimObject(this.signupData.data);
    this.signupData.loading = true;
    this.signupData.error = null;

    this.signupData.sub = this._authService.signUp(this.signupData.data)
    .subscribe(res => {

      this.signupData.loading = false;
      this.signupData.sub.unsubscribe();
      this._router.navigate(['/profile', res.user._id]);
      

    }, err => {

      console.log(err);
      this.signupData.error= err;
      this.signupData.loading = false;
      this.signupData.sub.unsubscribe();

    })
  }

}
