import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email!: string;
  password!: string;

  constructor(private router: Router) {}

  login() {
    // Implementar a lógica de login aqui
    // Você pode fazer uma requisição HTTP para autenticar o usuário, por exemplo

    // Após o login ser bem-sucedido, redirecione para a página inicial
    this.router.navigate(['/']);
  }
}
