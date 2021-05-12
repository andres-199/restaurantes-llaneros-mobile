import { Carrito } from 'src/app/cart/interfaces/carrito.interface';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Imagen } from 'src/app/interfaces/imagen.interface';
import { MetodoPago } from 'src/app/interfaces/metodo-pago.interface';
import { Producto } from './producto/producto.interfcae';

export interface Restaurante {
  id?: number;
  nombre?: string;
  descripcion?: string;
  imagen?: Imagen;
  Productos?: Producto[];
  direccion?: string;
  Categorias: Categoria[];
  Ordenes?: Carrito[];
  valorTotalOrdenes?: number;
  MetodosPago?: MetodoPago[];
  Mesas: any[];
}
