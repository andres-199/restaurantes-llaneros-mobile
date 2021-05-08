import { Tercero } from './tercero.interface';

export interface Usuario {
  id?: number;
  usuario?: string;
  contrasena?: string;
  rol_id?: number;
  tercero_id?: number;
  createdAt?: any;
  updatedAt?: any;
  Tercero?: Tercero;
}
