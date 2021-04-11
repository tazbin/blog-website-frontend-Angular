import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { ErrorService } from './error.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $User: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService,
    private _errorService: ErrorService
  ) { }

  signUp(data): Observable<any> {
    return this._http.post<any>(`${environment.apiUrl}/user/register`, data)
    .pipe(
      tap(res => {
        this._localStorageService.setTokens(res.accessToken, res.refreshToken);
        this.$User.next(res.user);
      }),
      catchError(err => this._errorService.handleError(err))
    );
  }

  login(data): Observable<any> {
    return this._http.post<any>(`${environment.apiUrl}/user/login`, data)
    .pipe(
      tap(res => {
        this._localStorageService.setTokens(res.accessToken, res.refreshToken);
        this.$User.next(res.user);
      }),
      catchError(err => this._errorService.handleError(err))
    )
  }

  logout() {
    this._localStorageService.clearTokens();
    this.$User.next(null);
  }

  fetchUserData(): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/user/me`)
    .pipe(
      tap(res => {
        this.$User.next({
          _id: res._id,
          first_name: res.first_name,
          role: res.role
        })
      }),
      catchError(err => this._errorService.handleError(err))
    )
  }

  editUser(data) {
    return this._http.put(`${environment.apiUrl}/user/editProfile`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getLoggedInUserData(): Observable<any> {
    return this.$User.pipe(
      switchMap(u => {

        if( u ) {
          return of(u)
        }

        const accessToken = this._localStorageService.getAccessToken();
        if( accessToken ) {
          return this.fetchUserData();
        }

        return of(null);

      })
    )
  }

  refreshToken(): Observable<{accessToken: string, refreshToken: string}> {
    const refreshToken = this._localStorageService.getFreshToken();
    return this._http.post<{accessToken: string, refreshToken: string}>(`${environment.apiUrl}/user/me/refresToken`, {refreshToken})
    .pipe(
      tap(res => {
        console.log('Token refreshed!');
        this._localStorageService.setTokens(res.accessToken, res.refreshToken)
      })
    )
  }

  getBloggerProfile(bloggerId: String) {
    return this._http.get(`${environment.apiUrl}/user/bloggerProfile/${bloggerId}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    )
  }

}

