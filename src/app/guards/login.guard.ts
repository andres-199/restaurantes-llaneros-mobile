import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from '../login/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogedIn = this.userService.isLogedIn;

    if (!isLogedIn) {
      this.confirmRedirect();
    }

    return isLogedIn;
  }

  private async confirmRedirect() {
    const message =
      'Ingresa con tu usuario y contraseña o registrate 📝 para acceder';
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      buttons: [
        'No',
        {
          text: 'Si',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await toast.present();
  }
}
