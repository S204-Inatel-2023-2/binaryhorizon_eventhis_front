import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from './../../services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  @ViewChild(IonModal) modal!: IonModal;
  user: any
  postData = {
    name: '',
    email: '',
    password: '',
    company: '',
    linkedin: '',
    phone: '',
    photo: '', 
    is_staff: ''
  };
  isStaff: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private toastService: ToastService,
  ) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    try {
      const userData = await this.route.snapshot.data['userData']['contact'];
      const user_id = await this.route.snapshot.data['userData']['user_id'];
      const staf_data = await this.route.snapshot.data['userData']['is_staff'];
      if (userData) {
        this.user = userData;
        this.isStaff = staf_data;
        this.user.name = this.capitalizeFirstLetter(this.user.name);
        this.user.user_id = user_id;

        //atribunindo dados do modal
        this.postData.name = this.user.name;
        this.postData.email = this.user.email;
        this.postData.company = this.user.company;
        this.postData.linkedin = this.user.linkedin;
        this.postData.phone = this.user.phone;
        this.postData.photo = this.user.photo;
        this.postData.is_staff = this.user.is_staff;

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

  loginPostData = {
    email: '',
    password: ''
};
  
  //IMPLEMENTING MODAL
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    // mostrando postdata

    this.loginPostData.email = this.postData.email;
    this.loginPostData.password = this.postData.password;

    // validando login
    this.authService.login(this.loginPostData).subscribe({
      next: (res: any) => {
        // When the response is successfully received, this function is called.

        if (res['user']) {
          // If the response includes user data, it means the login was successful.
          // Stores the user data in a local storage system.
          this.storageService.store(AuthConstants.AUTH, res['user']);
          // Realizando atualização cadastral
          this.authService.editUser(this.user.user_id, this.postData).subscribe({
              next: (res: any) => {
                if (res['success']) {
                  this.modal.dismiss(null, 'confirm');
                  window.location.reload();
                  this.toastService.presentToast("Profile updated.");
                  //atualizando dados do perfil
                  
                }
              },
              error: (error: any) => {
                this.toastService.presentToast("Failed to update profile.");
          }});

        } else {
          // If the response doesn't include user data, it indicates an authentication error.
          // Therefore, it displays an error message to the user.
          this.toastService.presentToast('Internal server error.');
          
        }
      },
      error: (error: any) => {
        // If an error occurs during the authentication call, this error function is called.
        // It displays a network error message to the user.
        this.toastService.presentToast("Incorrect password.");
        
      }
    });



  }

  onWillDismiss(event: Event) {
    
  }

  goToMyEvents() {
    this.router.navigate(['/events/my-events']);
  }
}