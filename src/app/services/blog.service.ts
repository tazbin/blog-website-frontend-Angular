import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService
  ) { }

  writeBlog(data) {
    return this._http.post(`${environment.apiUrl}/blog`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  postComment(data) {
    return this._http.post(`${environment.apiUrl}/blog/comment`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  postReact(data) {
    return this._http.put(`${environment.apiUrl}/blog/react`, data)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getblogList(bloggerId, categoryId, page = 1) {
    return this._http.get(`${environment.apiUrl}/blog/${bloggerId}/${categoryId}?page=${page}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

  getBlogDetails(blogId) {
    return this._http.get(`${environment.apiUrl}/blog/details/${blogId}`)
    .pipe(
      catchError(err => this._errorService.handleError(err))
    );
  }

}
