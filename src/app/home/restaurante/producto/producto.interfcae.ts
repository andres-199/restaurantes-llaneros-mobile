import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Imagen } from 'src/app/interfaces/imagen.interface';
import { Restaurante } from '../restaurante.interface';

export interface Producto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  restaurante_id?: number;
  categoria_id?: number;
  Imagenes?: Imagen[];
  Categoria?: Categoria;
  Restaurant?: Restaurante;
}
