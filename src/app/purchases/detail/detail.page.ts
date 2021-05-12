import { Component, Input, OnInit } from '@angular/core';
import { Venta } from 'src/app/cart/interfaces/venta.interface';
import { setPath } from 'src/util/image-path';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @Input() compra: Venta;
  constructor() {}

  ngOnInit() {
    this.compra.DetalleVenta.forEach((orden) =>
      orden.Producto.Imagenes.forEach((imagen) => setPath(imagen))
    );
  }
}
