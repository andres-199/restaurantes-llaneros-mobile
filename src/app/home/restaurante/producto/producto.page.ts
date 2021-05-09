import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/cart/carrito.service';
import { Restaurante } from '../restaurante.interface';
import { Producto } from './producto.interfcae';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  @Input() restaurante: Restaurante;
  @Input() producto: Producto;

  selectedImageIndex: number = -1;
  showFullScreen = false;
  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.producto.Imagenes?.forEach((imagen) => {
      imagen['image'] = imagen.path;
    });
  }

  showFullScreenImage(index: number) {
    this.selectedImageIndex = index;
    this.showFullScreen = true;
  }

  closeEventHandler() {
    this.showFullScreen = false;
    this.selectedImageIndex = -1;
  }

  onClickCart() {
    this.carritoService.onAddProduct(this.producto);
  }
}
