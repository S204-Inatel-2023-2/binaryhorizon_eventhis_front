import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants'
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  postData = {
      email: '',
      password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}
  
  ngOnInit() {}
  validateInputs() {
    let email = this.postData.email.trim();
    let password = this.postData.password.trim();

    return (
      this.postData.email &&
      this.postData.password &&
      email.length > 0 &&
      password.length > 0
    );
  }
  
  login() {
    // This function, called login, is likely used to handle the authentication process.
  
    // First, it checks if user inputs are valid using the validateInputs() function.
    if (this.validateInputs()) {
  
      // If user inputs are valid, it calls the authentication service (authService) to perform the login.
      this.authService.login(this.postData).subscribe({
        next: (res: any) => {
          // When the response is successfully received, this function is called.
  
          if (res['user']) {
            // If the response includes user data, it means the login was successful.
  
            // Stores the user data in a local storage system.
            this.storageService.store(AuthConstants.AUTH, res.userData);
  
            // Then, redirects the user to the main page (route '/') of your application.
            this.router.navigate(['/']);
          } else {
            // If the response doesn't include user data, it indicates an authentication error.
            // Therefore, it displays an error message to the user.
            this.toastService.presentToast('Incorrect username and password.');
          }
        },
        error: (error: any) => {
          // If an error occurs during the authentication call, this error function is called.
          // It displays a network error message to the user.
          this.toastService.presentToast("Incorrect username and password.");
        }
      });
    } else {
      // If user inputs are not valid, it displays an error message to the user.
      this.toastService.presentToast('Incorrect username and password.');
    }
  }  
}
