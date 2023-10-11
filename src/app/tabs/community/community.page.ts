import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-community',
  templateUrl: 'community.page.html',
  styleUrls: ['community.page.scss'],
  
})
export class CommunityPage {
  doRefresh(event: any) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  constructor(
    protected authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  friends: any
  user: any

  goToProfile(user_id: string) {
    this.router.navigate(['/community', user_id]);
  }

  CapitalizeFirstLetter(string: string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  ngOnInit() {    
    try {
      let userData = this.route.snapshot.data['userData'];
      if (userData) {
        this.user = userData;
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }

    this.authService.getAllUsers().subscribe({
      next: (res: any) => {
        if (res['users']) {
          let usersData = res['users'];

          if(usersData) {
            this.friends = usersData;

            console.log(this.user)

            for (let i = 0; i < this.friends.length; i++) {
              this.friends[i].contact.name = this.CapitalizeFirstLetter(this.friends[i].contact.name);
              
              console.log(this.friends[i])

              if(this.friends[i].user_id === this.user.user_id) {
                this.friends.splice(i, 1);
                i--; // Decrement i to account for the removed element
              }

              if(this.friends[i].contact.photo === "") {
                this.friends[i].contact.photo = "https://placehold.co/100x100";
              }
            }
          }
        } else {
          this.toastService.presentToast('Could not find friends.');
        }
      },
      error: (error: any) => {
        this.toastService.presentToast("Could not find friends.");
      }
    });
  }
}