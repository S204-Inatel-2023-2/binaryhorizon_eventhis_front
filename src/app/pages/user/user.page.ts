import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  user: any
  userId: any

  loggedInUser: any

  alreadyFriend: boolean = false

  async removeFriend(friendId: any) {
    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
      this.toastService.presentToast('Faça login para remover amigos.');
      return;
    }
    this.authService.removeFriend(this.loggedInUser['user_id'], friendId).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res['success']) {
          this.toastService.presentToast('Amizade removida com sucesso!');
          window.location.reload();
        } else {
          this.toastService.presentToast('Não foi possível remover a amizade.');
        }
      },
      error: (error: any) => {
        this.toastService.presentToast("Não foi possível remover a amizade.");
      }
    });
  }

  async addFriend(friendId: any) {
    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
      this.toastService.presentToast('Faça login para adicionar amigos.');
      return;
    }
    this.authService.addFriend(this.loggedInUser['user_id'], friendId).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res['success']) {
          this.toastService.presentToast('Amigo adicionado com sucesso!');
          window.location.reload();
        } else {
          this.toastService.presentToast('Não foi possível adicionar o amigo.');
        }
      },
      error: (error: any) => {
        this.toastService.presentToast("Não foi possível adicionar o amigo.");
      }
    });
  }

  async ionViewWillEnter() {

    this.alreadyFriend = false
    
    try {
      const userData = await this.route.snapshot.data['userData'];
      if (userData) {
        this.loggedInUser = userData;

        this.authService.getConnections(this.loggedInUser['user_id']).subscribe({
          next: (res: any) => {
            if (res['success']) {
              let connections = res['connections'];

              for (let i = 0; i < connections.length; i++) {
                if(connections[i].user_id == this.userId) {
                  this.alreadyFriend = true
                }
              }
            } else {
              this.toastService.presentToast('Não foi possível encontrar seus amigos.');
            }
          },
          error: (error: any) => {
            this.toastService.presentToast("Não foi possível encontrar seus amigos.");
          }
        })

        
      }
      else{
        this.loggedInUser = null;
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
    }
  }

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
              this.toastService.presentToast('Não foi possível encontrar seus amigos.');
            }
          },
          error: (error: any) => {
            this.toastService.presentToast("Não foi possível encontrar seus amigos.");
          }
        });
      });
    }
  }