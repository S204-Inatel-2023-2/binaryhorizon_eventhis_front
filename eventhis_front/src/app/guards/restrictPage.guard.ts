import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
providedIn: 'root'
})
export class RestrictPageGuard {
constructor(public storageService: StorageService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService
      .get(AuthConstants.AUTH)
      .then(res => {
        if (res) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      })
      .catch(err => {
        resolve(false);
      });
    });
  }
}