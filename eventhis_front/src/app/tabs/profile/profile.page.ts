import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  user =  {
    name: 'Pitaya',
    email: 'pitaya@email.com',
    company: 'Pitaya Inc',
    linkedin: 'Pitaya',
    phone: '35987654321',
    photo: 'https://placehold.co/400x400'
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }
  
  logout() {
    this.authService.logout();
  }
}