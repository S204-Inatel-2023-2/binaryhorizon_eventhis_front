import { Component } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: 'community.page.html',
  styleUrls: ['community.page.scss']
})
export class CommunityPage {

  friends = [
    {
      name: 'Airton',
      age: 21
    },{
      name: 'Pedrinho',
      age: 18
    }
  ]

  constructor() {}

}
