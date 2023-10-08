import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage {
  doRefresh(event: any) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  events: any;

  constructor(
    private route: ActivatedRoute,
    protected authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}
  
  goToEventDetails(eventId: string) {
    this.router.navigate(['/events/' + eventId]);
  }

  goToCreateEvent() {
    this.router.navigate(['/events/new']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.authService.getAllEvents().subscribe({
        next: (res: any) => {
          if (res['events']) {
            const eventsData = res['events'];

            if(eventsData) {
              this.events = eventsData;

              for (let i = 0; i < this.events.length; i++) {
                if(this.events[i].photo === "") {
                  this.events[i].photo = "https://placehold.co/600x400";
                }
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