import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lets blog';
  getUserSub: Subscription;

  constructor(
    private _authService: AuthService
  ) {}

  ngOnInit(): void {

    this.getUserSub = this._authService.fetchUserData()
    .subscribe(res => {
      this.getUserSub.unsubscribe();
    }, err => {
      this.getUserSub.unsubscribe();
    });

  }

}
