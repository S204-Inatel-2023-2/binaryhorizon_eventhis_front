import { Component } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: 'community.page.html',
  styleUrls: ['community.page.scss']
})
export class CommunityPage {
  doRefresh(event: any) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  friends = [
    {
      name: 'Matheus Souza'
    },{
      name: 'Pedro Ribeiro'
    },{
      name: 'João Pedro'
    },{
      name: "Jorge Mendes"
    },{
      name: "Gabriel Oliveira"
    },{
      name: "Thiago Santos"
    }
  ]

  constructor() {}

}
