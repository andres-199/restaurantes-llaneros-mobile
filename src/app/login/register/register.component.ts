import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Tercero } from 'src/app/interfaces/tercero.interface';
import md5 from 'md5';
import { BackendResponse } from 'src/app/interfaces/backend-response.interface';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
export type PasswordRegister = { psw1?: string; psw2?: string };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onRegister = new EventEmitter<Usuario>();
  password: PasswordRegister = {};
  tercero: Tercero = {};
  constructor(
    private toastController: ToastController,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  async onClickRegistrar(form) {
    if (!form.valid) {
      const toast = await this.toastController.create({
        message: 'Debe llenar los campos requeridos',
        buttons: ['Aceptar'],
      });
      await toast.present();
      return false;
    }

    if (this.password.psw1 !== this.password.psw2) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar'],
      });
      await toast.present();
      return false;
    }

    this.tercero.Usuario = {
      usuario: this.tercero.email,
      contrasena: md5(this.password.psw1),
    };

    this.register();
  }

  private register() {
    this.userService.register(this.tercero).subscribe({
      next: async (response: BackendResponse) => {
        const usuario: Usuario = {
          usuario: this.tercero.email,
        };

        const toast = await this.toastController.create({
          message: response.message,
          duration: 5000,
          buttons: [
            {
              text: 'Aceptar',
              handler: () => this.onRegister.emit(usuario),
            },
          ],
        });
        await toast.present();
        this.onRegister.emit(usuario);
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
