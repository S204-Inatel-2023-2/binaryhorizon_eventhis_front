import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  postData = {
    name: '',
    description: '',
    date: '',
    max_capacity: '',
    place: '',
    photo: '',
    host_id: ''
  };
  
  event: any

  constructor(
    protected authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  imageSource:any;
  imageStateMessage = "Foto não carregada";

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
      // resultType: CameraResultType.Base64,
      // source: CameraSouce.Photos
    });
    console.log(image);
    this.imageSource = image.dataUrl;
    this.postData.photo = this.imageSource;
    // this.imageSource = 'data:image/jpeg;base64,' + image.base64String;
    this.imageStateMessage = "Foto carregada";
  };

  discardPicture = async () => {
    this.imageSource = '';
    this.postData.photo = '';
    this.imageStateMessage = "Foto não carregada";
  }

  ngOnInit() {
    // Converta sua string de data para o formato ISO 8601
    let dateString = new Date();
    let isoDateString = new Date(dateString).toISOString();
    this.postData.date = isoDateString
  }

  async ngAfterViewInit() {
    try {
      const userData = await this.route.snapshot.data['userData'];
      if (userData) {
        this.postData.host_id = userData.user_id;
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }
  }
  

  createEvent() {
    

    //define filename
    const seed = this.postData.name + this.postData.host_id;
    const filename = SHA256(seed).toString();

    //upload image
    this.authService.uploadImage(this.postData, filename).subscribe({
      next: (res: any) => {
        if (res['url']) {
          this.postData.photo = res['url'];


          //create event
          this.authService.createEvent(this.postData).subscribe({
            next: (res: any) => {
              if (res['event']) {
      
                this.event = res['event'];
      
                var url = '/events/' + this.event.event_id;
      
                this.router.navigate([url]);
              } else {
                this.toastService.presentToast(
                  'Dados ja existem, por favor insira novos.'
                );
              }
            },
            error: (error: any) => {
              this.toastService.presentToast('Não foi possivel criar o evento.');
            }
          });



        } else {
          this.toastService.presentToast(
            'Dados ja existem, por favor insira novos.'
          );
        }
      },
      error: (error: any) => {
        this.toastService.presentToast('Não foi possivel criar o evento.');
      }
    });



  }
}
