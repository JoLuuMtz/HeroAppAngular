import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';


@Pipe({
  name: 'heroImage',
  standalone: true
})

export class ImgPipe implements PipeTransform {

  // metodo que implementa la interfaz PipeTransform
  transform(value: Hero): string {

    // verifica si hay un id y una imagen alternativa
    if ( !value.id && !value.alt_img ) { // si no hay id ni imagen alternativa
      // retorna la imagen por defecto que es una imagen vacia
      return 'assets/no-image.png';
    }

    if ( value.alt_img ) { // retorna la imagen alternativa
      return value.alt_img;
      // coloca la el nombre de la imagen alternativa en el src de la etiqueta img
    }
    // coloca el id de la imagen en el src de la etiqueta img
    return `assets/heroes/${value.id}.jpg`;

  }
}

