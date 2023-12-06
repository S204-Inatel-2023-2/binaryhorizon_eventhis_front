import { Component } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  swiperModules = [IonicSlides];

  events: any
  events1: any
  events2: any
  allUsers: any
  user: any
  youMustKnow: any

  alreadyFriends: any

  doRefresh(event: any) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  goToProfile(user_id: string) {
    this.router.navigate(['/community', user_id]);
  }

  goToEventDetails(eventId: string) {
    this.router.navigate(['/events/' + eventId]);
  }

  async ionViewWillEnter() {
    this.authService.getAllEvents().subscribe({
      next: (res: any) => {
        if (res['events']) {
          const eventsData = res['events'];

          if(eventsData) {
            this.events = eventsData;

            for (let i = 0; i < this.events.length; i++) {
              if(this.events[i].photo === "") {
                this.events[i].photo = "https://placehold.co/600x400";
              }

              if(this.events[i].name.length > 20) {
                this.events[i].name = this.events[i].name.substring(0, 20) + "...";
              }
            }
          }

          this.events1 = this.events.slice(0, Math.ceil(this.events.length / 2));
          this.events2 = this.events.slice(Math.ceil(this.events.length / 2), this.events.length);
          
        } else {
          this.toastService.presentToast('Não foi possível encontrar o evento.');

          this.router.navigate(['/events']);
        }
      },
      error: (error: any) => {
        this.toastService.presentToast("Não foi possível encontrar o evento.");

        this.router.navigate(['/events']);
      }
    });

    try {
      let userData = await this.route.snapshot.data['userData'];
      if (userData) {
        this.user = userData;
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }

    this.alreadyFriends = null;

    if(this.user){
      this.authService.getConnections(this.user['user_id']).subscribe({
        next: (res: any) => {
          if (res['success']) {
            this.alreadyFriends = res['connections'];
          } else {
            this.toastService.presentToast('Não foi possível encontrar amigos.');
          }
        },
        error: (error: any) => {
          this.toastService.presentToast("Não foi possível encontrar amigos.");
        }
      });
    }

    this.authService.getAllUsers().subscribe({
      next: (res: any) => {
        if (res['users']) {
          let usersData = res['users'];
          let excludeIds = [];
          this.youMustKnow = [];
          if(usersData) {
            this.allUsers = usersData;
            
            for (let i = 0; i < this.alreadyFriends.length; i++) {
              excludeIds.push(this.alreadyFriends[i].user_id);
            }
            excludeIds.push(this.user.user_id);

            for (let i = 0; i < this.allUsers.length; i++) {
              let fullName = this.allUsers[i].contact.name;
              let firstName = fullName.split(' ')[0];
              //pick only first name
              this.allUsers[i].contact.name = firstName

              if(this.allUsers[i].contact.photo === "") {
                this.allUsers[i].contact.photo = "https://placehold.co/100x100";
              }

              if(!this.user || !excludeIds.includes(this.allUsers[i].user_id)) 
              {
                this.youMustKnow.push(this.allUsers[i]);
              }
            }
          }
        } else {
          this.toastService.presentToast('Não foi possível encontrar amigos.');
        }
      },
      error: (error: any) => {
        this.toastService.presentToast("Não foi possível encontrar amigos.");
      }
    });
  }
}
