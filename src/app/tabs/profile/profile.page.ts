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
        this.user.name = this.capitalizeFirstLetter(this.user.name);
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }
  
  logout() {
    this.authService.logout();
  }
  doSomething() {
    console.log('Something');
  }
}