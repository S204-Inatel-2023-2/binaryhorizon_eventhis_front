import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
providedIn: 'root'
})
export class IndexGuard {
  constructor(public storageService: StorageService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService
      .get(AuthConstants.AUTH)
      .then(res => {
        if (res) {
          this.router.navigate(['/']);
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(err => {
        resolve(true);
      });
    });
  }
}