import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

  postData = {
    image_url: "",
    image: "",
  }  

  doCheckin = async (image_url: string, user_id: string) => {
    this.postData.image_url = image_url

    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    
    if (image.dataUrl) {
      this.postData.image = image.dataUrl;
    }

    console.log(this.postData);

    this.authService.facialRecognition(this.postData).subscribe({
      next: (res: any) => {
        if(res['Response'] == true) {
          this.toastService.presentToast('Check-in realizado com sucesso!');
        } else {
          this.toastService.presentToast('Não foi possível validar o check-in!');
        }
      },
      error: (error: any) => {
        this.toastService.presentToast('Não foi possível validar o check-in!');
      }
    });
  };

  editEvent() {
    console.log("Volte mais tarde para editar o evento!")
  }

    unsubscribeFromEvent() {
    console.log("Volte mais tarde para se desinscrever desse evento!")
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
