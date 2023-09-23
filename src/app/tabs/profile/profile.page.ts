import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  user: any

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    try {
      const userData = await this.route.snapshot.data['userData']['contact'];
      if (userData) {
        this.user = userData;
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }
  }
  
  logout() {
    this.authService.logout();
  }
}