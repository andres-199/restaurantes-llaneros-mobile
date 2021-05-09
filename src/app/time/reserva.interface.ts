import { Restaurante } from '../home/restaurante/restaurante.interface';
import { Tercero } from '../interfaces/tercero.interface';

export interface Reserva {
  id?: number;
  fecha?: Date;
  tercero_id?: number;
  restaurante_id?: number;
  numero_mesas?: number;
  Tercero?: Tercero;
  Restaurant?: Restaurante;
}
