import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

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
