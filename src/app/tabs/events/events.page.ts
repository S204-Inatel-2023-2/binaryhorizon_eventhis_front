import { Component } from '@angular/core';

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

  constructor() {}

}
