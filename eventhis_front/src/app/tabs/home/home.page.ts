import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
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
    // Adicione mais eventos aqui
  ]

  eventosNear = [
    {
      titulo: 'Festa Inatel!',
      data: new Date(),
      imagem: 'https://i.pinimg.com/564x/31/e6/1d/31e61d2e45e57a8cdf15186c25654327.jpg'
    },
    {
      titulo: 'Feira de oportunidades',
      data: new Date(),
      imagem: 'https://i.pinimg.com/564x/4c/95/53/4c95537739d93bea4dee245b8ed28fba.jpg'
    },
    // Adicione mais eventos aqui
  ]

  constructor() {}

}
