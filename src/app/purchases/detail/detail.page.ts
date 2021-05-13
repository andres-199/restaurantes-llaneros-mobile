import { Component, Input, OnInit } from '@angular/core';
import { Venta } from 'src/app/cart/interfaces/venta.interface';
import { Imagen } from 'src/app/interfaces/imagen.interface';
import { environment } from 'src/environments/environment';
import { setPath } from 'src/util/image-path';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @Input() compra: Venta;

  paymentSupport: Imagen;
  showPaymentSupportFull = false;
  constructor() {}

  ngOnInit() {
    this.compra.DetalleVenta.forEach((orden) =>
      orden.Producto.Imagenes.forEach((imagen) => setPath(imagen))
    );

    this.paymentSupport = this.compra.soporte_pago;
  }

  get paymentSupportThumbnail() {
    return (
      environment.STORAGE_URL +
      this.paymentSupport?.path.replace('original', 'pequeno')
    );
  }

  get paymentSupportFull() {
    return environment.STORAGE_URL + this.paymentSupport?.path;
  }
}
