import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }

  getFreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken;
  }

  clearTokens() {
    localStorage.clear();
  }
}
