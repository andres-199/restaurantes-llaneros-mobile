import { Restaurante } from 'src/app/home/restaurante/restaurante.interface';
import { Direccion } from 'src/app/interfaces/direccion.interface';
import { Imagen } from 'src/app/interfaces/imagen.interface';
import { MetodoPago } from 'src/app/interfaces/metodo-pago.interface';
import { Tercero } from 'src/app/interfaces/tercero.interface';
import { DetalleVenta } from './detalle-venta.interface';

export interface Venta {
  id?: number;
  tercero_id?: number;
  valor?: number;
  fecha?: Date;
  restaurante_id?: number;
  soporte_pago?: Imagen;
  valida?: boolean;
  rechazada?: boolean;
  direccion_entrega?: Direccion;
  metodo_pago?: MetodoPago;
  Tercero?: Tercero;
  DetalleVenta?: DetalleVenta[];
  Restaurant?: Restaurante;
}
