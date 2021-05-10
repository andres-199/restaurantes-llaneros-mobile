import { Producto } from '../home/restaurante/producto/producto.interfcae';

export interface Carrito {
  id?: number;
  tercero_id?: number;
  producto_id?: number;
  cantidad?: number;
  fecha?: Date;
  Producto?: Producto;
  selected?: boolean;
}
