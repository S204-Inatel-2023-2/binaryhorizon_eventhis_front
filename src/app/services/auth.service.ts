import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {}

  getUserData(): Promise<any> {
    return this.storageService.get(AuthConstants.AUTH);
  }

  getEventData(getData: any): Observable<any> {
    return this.httpService.get('events/', getData);
  }

  getAllEvents(): Observable<any> {
    return this.httpService.get('events/');
  }

  login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('register', postData);
  }

  logout() {
      this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
        this.userData$.next('');
        this.router.navigate(['/profile/login']);
    });
  }
}