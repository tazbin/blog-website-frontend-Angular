import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(err: HttpErrorResponse) {
    console.log(err);
    let errMsg = '';
    if( !err.error || !err.error.error ) {
      errMsg = 'Network error';
    } else if(err.error.error.message) {
      errMsg = err.error.error.message;
    } else {
      errMsg = 'Unknown error occured, try agaian'
    }
    return throwError(errMsg);
  }
}
