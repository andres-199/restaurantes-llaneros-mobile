import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import md5 from 'md5';
import { UserService } from './user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: Usuario = {};
  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  onClickLogin() {
    if (!this.user.usuario || !this.user.contrasena) {
      return false;
    }

    this.user.contrasena = md5(this.user.contrasena);

    this.userService.login(this.user).subscribe({
      next: (user) => {
        this.userService.user = user;
        this.router.navigate(['']);
        // this.carritoService.updateTotalOrdenes();
      },
      error: async (e) => {
        const toast = await this.toastController.create({
          message: e.error.message,
          duration: 3000,
        });
        await toast.present();
      },
    });
  }
}
