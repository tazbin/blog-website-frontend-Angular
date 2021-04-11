import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  page: Observable<string>;
  User: Observable<User>;

  constructor(
    private _utils: UtilsService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.page = this._utils.page;
    this.User = this._authService.$User;
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}
