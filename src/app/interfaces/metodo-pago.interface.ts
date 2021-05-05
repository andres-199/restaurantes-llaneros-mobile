import { RestauranteMetodoPago } from '../home/restaurante/restaurante-metodo-pago.interface';

export interface MetodoPago {
  id?: number;
  nombre?: string;
  descripcion?: string;
  RestauranteMetodoPago: RestauranteMetodoPago;
  imagen: string;
  contra_entrega: boolean;
}
