import { Producto } from '../../home/restaurante/producto/producto.interfcae';

export interface DetalleVenta {
  id?: number;
  venta_id?: number;
  producto_id?: number;
  valor_unidad?: number;
  cantidad?: number;
  valor_total?: number;
  Producto?: Producto;
}
