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

  constructor(
    private route: ActivatedRoute,
    protected authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}
  doSomething() {
    console.log('Something');
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      
      this.authService.getEventData(this.eventId).subscribe({
        next: (res: any) => {
          if (res['event']) {
            const eventData = res['event'];

            if(eventData) {
              this.event = eventData;

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
