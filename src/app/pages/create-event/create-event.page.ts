import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  public datetime: any;

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
  imageStateMessage = "Foto não capturada";

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
      // resultType: CameraResultType.Base64,
      // source: CameraSouce.Photos
    });

    this.imageSource = image.dataUrl;
    this.postData.photo = this.imageSource;
    // this.imageSource = 'data:image/jpeg;base64,' + image.base64String;

    this.imageStateMessage = "Foto capturada";
  };

  discardPicture = async () => {
    this.imageSource = '';
    this.postData.photo = '';
    this.imageStateMessage = "Foto não capturada";
  }

  ngOnInit() {
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
    this.postData.photo = "teste";
    
    const date = new Date();
    date.setDate(date.getDate());
    
    this.postData.date = date.toISOString();

    console.log(this.postData);
    this.authService.createEvent(this.postData).subscribe({
      next: (res: any) => {
        if (res['event']) {

          this.event = res['event'];

          var url = '/events/' + this.event.event_id;

          this.router.navigate([url]);
        } else {
          this.toastService.presentToast(
            'Data alreay exists, please enter new details.'
          );
        }
      },
      error: (error: any) => {
        this.toastService.presentToast('Could not create event.');
      }
    });
  }
}
