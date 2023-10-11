import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) { }

  user: any
  userId: any

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
          
        this.authService.getUser(this.userId).subscribe({
          next: (res: any) => {
            if (res['user']) {
              let userData = res['user'];

              if(userData) {
                this.user = userData;
                  if(this.user.contact.photo === "") {
                    this.user.contact.photo = "https://placehold.co/100x100";
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
      });
    }
  }