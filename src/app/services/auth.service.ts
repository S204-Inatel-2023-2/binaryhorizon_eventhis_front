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

  subscribeToEvent(event_id:any, participant_id:any): Observable<any> {
    const url = 'events/' + event_id + '/add-participant/' + participant_id;
    return this.httpService.post(url);
  }

  getUserData(): Promise<any> {
    return this.storageService.get(AuthConstants.AUTH);
  }

  getUser(getData: any): Observable<any> {
    return this.httpService.get('users', getData);
  }

  getAllUsers(): Observable<any> {
    return this.httpService.get('users');
  }

  getEventData(getData: any): Observable<any> {
    return this.httpService.get('events', getData);
  }

  getAllEvents(): Observable<any> {
    return this.httpService.get('events');
  }

  createEvent(postData: any): Observable<any> {
    return this.httpService.post('events', postData);
  }

  login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
  }

  uploadImage(postData: any, filename: string): Observable<any> {
    let imageData = {
      image: postData.photo,
      filename: filename
    }
    return this.httpService.postImage(imageData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('users', postData);
  }

  logout() {
      this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
        this.userData$.next('');
        this.router.navigate(['/profile/login']);
    });
  }
}