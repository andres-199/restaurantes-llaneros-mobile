import { Imagen } from 'src/app/interfaces/imagen.interface';
import { environment } from 'src/environments/environment';

type size = 'largo' | 'original' | 'mediano' | 'pequeno';

export function setPath(imagen: Imagen, size: size = 'original') {
  const isFullPath = imagen.path.includes('http');
  if (!isFullPath) {
    imagen.path.replace('original', size);
    imagen.path = environment.STORAGE_URL + imagen.path;
  }
}
