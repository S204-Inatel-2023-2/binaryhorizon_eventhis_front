import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  eventId!: string
  event: any
  user: any
  is_owner: boolean = false
  is_subscribed: boolean = false

  constructor(
    private route: ActivatedRoute,
    protected authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  editEvent() {
    console.log("Volte mais tarde!")
  }

  unsubscribeFromEvent() {
    console.log("Volte mais tarde!")
  }

  goToProfile(user_id: string) {
    this.router.navigate(['/community', user_id]);
  }

  async subscribeToEvent() {

    if (this.user) {

      this.authService.subscribeToEvent(this.eventId, this.user.user_id).subscribe({
        next: (res: any) => {
          if (res['success']) {
            this.toastService.presentToast('Você se inscreveu nesse evento.');
          } else {
            this.toastService.presentToast('Não foi possível se inscrever nesse evento.');
          }
        },
        error: (error: any) => {
          this.toastService.presentToast("Could not find event.");
  
          this.router.navigate(['/events']);
        }
      });
     
    } else {
      this.router.navigate(['/login']);
      this.toastService.presentToast('Você precisa estar logado para se inscrever em um evento!');
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      
      this.authService.getEventData(this.eventId).subscribe({
        next: async (res: any) => {
          if (res['event']) {
            const eventData = res['event'];

            if(eventData) {
              this.event = eventData;

              try {
                const userData = await this.route.snapshot.data['userData'];
                if (userData) {
                  this.user = userData;

                  if(this.event.host.user_id == this.user.user_id) {
                    this.is_owner = true;
                  }

                  console.log(this.event)

                  let participants = this.event.participants;
                  for (let i = 0; i < participants.length; i++) {
                    if (participants[i].user_id == this.user.user_id) {
                      this.is_subscribed = true;
                      break;
                    }
                  }

                } else {
                  this.user = null;
                }
              } catch (error) {
                console.error('Usuário não está logado!');
              }


              if(this.event.photo === "") {
                this.event.photo = "https://placehold.co/600x400";
              }
            }
            
          } else {
            this.toastService.presentToast('Could not find event.');

            this.router.navigate(['/events']);
          }
        },
        error: (error: any) => {
          this.toastService.presentToast("Could not find event.");

          this.router.navigate(['/events']);
        }
      });
    });
  }
}
