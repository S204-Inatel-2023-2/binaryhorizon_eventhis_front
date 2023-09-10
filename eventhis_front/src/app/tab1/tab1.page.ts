import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  eventos = [
    {
      titulo: 'Rave do Airton',
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
      titulo: 'Pedrinho apresenta, como dar!',
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
