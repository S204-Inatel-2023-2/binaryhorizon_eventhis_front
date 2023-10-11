import { Component } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  swiperModules = [IonicSlides];

  doRefresh(event: any) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }
  
  eventos = [
    {
      titulo: 'Festival',
      data: new Date(),
      imagem: 'https://i.pinimg.com/564x/31/e6/1d/31e61d2e45e57a8cdf15186c25654327.jpg'
    },
    {
      titulo: 'Hacktown 2023',
      data: new Date(),
      imagem: 'https://i.pinimg.com/564x/4c/95/53/4c95537739d93bea4dee245b8ed28fba.jpg'
    },
    {
      titulo: 'Festival 2',
      data: new Date(),
      imagem: 'https://i.pinimg.com/564x/31/e6/1d/31e61d2e45e57a8cdf15186c25654327.jpg'
    },
    {
      titulo: 'Hacktown 2053',
      data: new Date(),
      imagem: 'https://i.pinimg.com/564x/4c/95/53/4c95537739d93bea4dee245b8ed28fba.jpg'
    }
  ]

  constructor() {}

}
