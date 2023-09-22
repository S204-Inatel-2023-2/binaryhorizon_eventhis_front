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
      name: 'Matheus Souza',
      image: "https://this-person-does-not-exist.com//img/avatar-gen116b25703c57577b8185afdc64b1bf43.jpg"
    },{
      name: 'Pedro Ribeiro',
      image: "https://this-person-does-not-exist.com/img/avatar-gen11488fa9bca558d00e07f0980cb9b0dd.jpg"
    },{
      name: 'João Pedro',
      image: "https://this-person-does-not-exist.com/img/avatar-gen1132dcff564ca4261d3a6d3f6d69c19e.jpg"
    },{
      name: "Jorge Mendes",
      image: "https://this-person-does-not-exist.com/img/avatar-genc4e18877b0a6ed87e2ff6469dc82d991.jpg"
    },{
      name: "Gabriel Oliveira",
      image: "https://this-person-does-not-exist.com/img/avatar-gene3bea93d7ce5375df8064db76b64a504.jpg"
    },{
      name: "Mariana Santos",
      image: "https://this-person-does-not-exist.com/img/avatar-gen115946b0b72fb91433aa0b4aefe86c37.jpg"
    }
  ]

  constructor() {}

}
