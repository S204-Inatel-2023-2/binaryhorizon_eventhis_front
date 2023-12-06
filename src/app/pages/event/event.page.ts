import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
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
  ) {

  }

  eventPostData = {
    name: '',
    description: '',
    date: '',
    max_capacity: '',
    place: '',
    photo: '',
    host_id: ''
  };

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

    this.authService.facialRecognition(this.postData).subscribe({
      next: (res: any) => {
        if(res['Response'] == true) {


          //realizando checkin
          this.authService.checkinParticipant(this.eventId, user_id).subscribe({
            next: (res: any) => {
              if (res['success']) {
                this.toastService.presentToast('Check-in realizado com sucesso!');
                window.location.reload();
              } else {
                this.toastService.presentToast('Não foi possível validar o check-in!');
              }
            },
            error: (error: any) => {
              this.toastService.presentToast('Falha ao realizar check-in!');
              console.log(error['error']['Message']);
            }
          });


        } else {
          this.toastService.presentToast('Não realizar o reconhecimento facial!');
        }
      },
      error: (error: any) => {
        this.toastService.presentToast('Faces não identificadas! Tente novamente.');
        console.log(error['error']['Message']);
      }
    });
  };


  async  unsubscribeFromEvent() {

    if (this.user) {

      this.authService.unsubscribeToEvent(this.eventId, this.user.user_id).subscribe({
        next: (res: any) => {
          if (res['success']) {
            this.toastService.presentToast('Você se desinscreveu deste evento.');
            window.location.reload();
          } else {
            this.toastService.presentToast('Não foi possível se desinscrever deste evento.');
          }
        },
        error: (error: any) => {
          this.toastService.presentToast("Não foi possível se desinscrever.");
  
          this.router.navigate(['/events']);
        }
      });
     
    } else {
      this.router.navigate(['/login']);
      this.toastService.presentToast('Você precisa estar logado para se desinscrever de um evento!');
    }

    // console.log("Volte mais tarde para se desinscrever desse evento!")
  }

  goToProfile(user_id: string) {
    this.router.navigate(['/community', user_id]);
  }

  //IMPLEMENTING MODAL
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    // mostrando postdata
    console.log(this.eventPostData);
    this.authService.editEvent(this.eventId, this.eventPostData).subscribe({
      next: (res: any) => {
        if (res['success']) {
          this.modal.dismiss(null, 'confirm');
          window.location.reload();
        }
      },
      error: (error: any) => {
        this.toastService.presentToast("Não foi possível editar o evento.");
  }});
  }

  onWillDismiss(event: Event) {
    
  }


  async subscribeToEvent() {

    if (this.user) {

      this.authService.subscribeToEvent(this.eventId, this.user.user_id).subscribe({
        next: (res: any) => {
          if (res['success']) {
            this.toastService.presentToast('Você se inscreveu nesse evento.');
            window.location.reload();
          } else {
            this.toastService.presentToast('Não foi possível se inscrever nesse evento.');
          }
        },
        error: (error: any) => {
          this.toastService.presentToast("Não foi possível encontrar o evento.");
  
          this.router.navigate(['/events']);
        }
      });
     
    } else {
      this.router.navigate(['/login']);
      this.toastService.presentToast('Você precisa estar logado para se inscrever em um evento!');
    }
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      
      this.authService.getEventData(this.eventId).subscribe({
        next: async (res: any) => {
          if (res['event']) {
            const eventData = res['event'];

            if(eventData) {
              this.event = eventData;

              //atribuindo dados ao eventPostData
              this.eventPostData.name = this.event.name;
              this.eventPostData.description = this.event.description;
              // Converta sua string de data para o formato ISO 8601
              let dateString = this.event.date;
              let isoDateString = new Date(dateString).toISOString();
              this.eventPostData.date = isoDateString;
              this.eventPostData.max_capacity = this.event.max_capacity;
              this.eventPostData.place = this.event.place;
              this.eventPostData.photo = this.event.photo;
              this.eventPostData.host_id = this.event.host.user_id;
              //mostrando eventPostData
              console.log(this.eventPostData);
              try {
                const userData = await this.route.snapshot.data['userData'];
                if (userData) {
                  this.user = userData;

                  if(this.event.host.user_id == this.user.user_id) {
                    this.is_owner = true;
                  }

                  let participants = this.event.participants;
                  let checkinParticipants = this.event.checked_in_participants;
                  console.log(checkinParticipants);
                  // TODO : check logic to check participant checkin status
                  for (let i = 0; i < checkinParticipants.length; i++) {
                    for (let j = 0; j < participants.length; j++) {

                      if(checkinParticipants[i].user_id == participants[j].user_id) {
                        participants[j].checkin_status = true;
                      }

                    }
                  }
                  for (let j = 0; j < participants.length; j++) {
                    //verificando inscrição
                    if (participants[j].user_id == this.user.user_id) {
                      this.is_subscribed = true;
                    }
                    // TO REMOVE -- MOCK DATA TO CHECKIN VALIDATION
                    participants[j].checkin_status = false;
                    if(j%2 != 0) {
                      participants[j].checkin_status = true;
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
            this.toastService.presentToast('Não foi possível encontrar o evento.');

            this.router.navigate(['/events']);
          }
        },
        error: (error: any) => {
          this.toastService.presentToast("Não foi possível encontrar o evento.");

          this.router.navigate(['/events']);
        }
      });
    });
  }
}
