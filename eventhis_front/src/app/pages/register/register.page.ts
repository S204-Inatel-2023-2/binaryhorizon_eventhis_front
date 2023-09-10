import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  postData = {
    name: '',
    email: '',
    password: '',
    company: '',
    linkedin: '',
    phone: '',
    photo: ''
  };

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router
    ) {}

  ngOnInit() {
  }

  validateInputs() {
    console.log(this.postData);
    let name = this.postData.name.trim();
    let password = this.postData.password.trim();
    let email = this.postData.email.trim();

    return (
      this.postData.name &&
      this.postData.password &&
      this.postData.email &&
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0
    );
  }
  register() {
    if (this.validateInputs()) {
      this.authService.signup(this.postData).subscribe({
        next: (res: any) => {
          if (res['user']) {
            // If the response includes user data, it means the login was successful.
  
            // Stores the user data in a local storage system.
            this.storageService.store(AuthConstants.AUTH, res.userData);
  
            // Then, redirects the user to the main page (route '/') of your application.
            this.router.navigate(['/']);
          } else {
            this.toastService.presentToast(
              'Data alreay exists, please enter new details.'
            );
          }
        },
        error: (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      });
    } else {
      this.toastService.presentToast(
        'Please enter email, username or password.'
      );
    }
  }
}
