import { Producto } from '../home/restaurante/producto/producto.interfcae';

export interface Categoria {
  id?: number;
  nombre?: string;
  descripcion?: string;
  Productos?: Producto[];
}
