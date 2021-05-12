import { Carrito } from '../cart/interfaces/carrito.interface';
import { Direccion } from './direccion.interface';
import { MetodoPago } from './metodo-pago.interface';

export interface Orden {
  detalles?: Carrito[];
  direccion_entrega?: Direccion;
  metodo_pago?: MetodoPago;
  fecha?: Date;
}
