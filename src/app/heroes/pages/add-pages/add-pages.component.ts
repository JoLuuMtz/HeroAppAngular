import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../material/material.module';
import { ImgPipe } from '../../pipes/img.pipe';
import { HeroesService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDeleteHeroComponent } from

  '../../components/dialogs/confirm-delete-hero/confirm-delete-hero.component';


@Component({
  selector: 'app-add-pages',
  imports:
    [
      RouterModule,
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
      ImgPipe,

    ],
  templateUrl: './add-pages.component.html',
  styleUrl: './add-pages.component.css'
})
export class AddPagesComponent implements OnInit {

  // inyecciones de dependencias para los servicios
  private readonly _heroServices = inject(HeroesService);
  private readonly _router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);
  private readonly _matDialog = inject(MatDialog);

  //Propiedades
  public Operation: 'Editar' | 'Agregar' = 'Agregar'

  public HeroForm = new FormGroup({

    id: new FormControl<string>(''),//validacion de campo requer
    superhero: new FormControl(''),//validacion de campo requerido
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl('',),//validacion de campo requerido
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  });

  public publisherOption = ['Marvel Comics', 'DC Comics']

  constructor() { }

  /*
    Ng On Init
  */
  ngOnInit(): void {
    this.activateRoute.params.pipe(
      // switchMap: cancela la subscripcion anterior y crea una nueva
      switchMap(({ id }) => this._heroServices.GetHeroById(id))
      // ejecuta el Observable del servicio
    ).subscribe((hero: Hero | undefined) => {
      if (!hero) {

        return;
      }

      //  resetea los campos pero si le mandas un objeto
      //  con valores, los campos se llenan con esos valores
      this.HeroForm.reset(hero);

      this.Operation = 'Editar';
      return;
    });


  }

  /*
  METHODS
  */

  // Obtener los datos de formaulario para el
  //   componente de forma global y no solo en el metodo saveHero
  get HeroFormValue(): Hero {
    const hero = this.HeroForm.value as Hero;
    return hero;
  }

  // manda a llamar el servicio de heroes para agregar un heroe
  saveHero(): void {

    if (this.HeroForm.invalid) {
      alert('El formulario no es valido');
      return;
    }

    console.log(this.HeroForm.value);
    //  manda la data del formulario al servicio de heroes

    // SI EXISTE UN ID ES PORQUE SE VA A EDITAR


    if (this.HeroForm.value.id) {
      this._heroServices.updateHero(this.HeroFormValue).subscribe(
        resp => {
          this.OpenSnackBar(`Se actualizó ${resp.superhero}`);
        }
      );
      return;
    }

    // SI NO EXISTE UN ID ES PORQUE SE VA A AGREGAR UN HEROE NUEVO
    this._heroServices.createHero(this.HeroFormValue).subscribe(

      resp => {
        this.OpenSnackBar(`Se agregó ${resp.superhero}`);

      }
    );

  }
  // Muestra un mensaje en la parte inferior de la pantalla
  private OpenSnackBar(message: string): void {
    this._snackBar.open(message, 'Ver Lista de Heroe', {


    }).onAction().subscribe(() => { // se ejecuta cuando se da click en el boton de ver heroe
      this._router.navigate(['/heroes/list']);
    })

  }

  // Elimina un heroe por su id
  deleteHero(): void {

    // Si no hay un heroe no se elimina
    if (!this.HeroForm.value.id) {
      alert('No se puede eliminar un heroe sin id');
      return;
    }

    const dialog = this._matDialog.open(ConfirmDeleteHeroComponent, {
      data: this.HeroForm.value // la data que recibe el dialog... osea el heroe
    });

    dialog.afterClosed().subscribe(
      (result) => { // resultado que emite el dialog cuando se cierra o hace click en si
        // en este caso el result es el heroe
        console.log(result);

        if (result === undefined) {
          return;
        }
        this._heroServices.deleteHeroiD(result.id).pipe(
          // `tap` se usa para realizar efectos secundarios sin modificar el flujo de datos.
          tap(resp => {
            if (!resp) {
              this.OpenSnackBar("Error al eliminar héroe"); // Muestra un mensaje de error
              throw new Error("Error al eliminar héroe"); // Detiene el flujo y pasa al `error` del `subscribe`
            }
          }),
          // Si la eliminación es exitosa, mostramos el Snackbar y esperamos a que el usuario haga clic en "Ver Lista!"
          switchMap(() => this._snackBar.open("Héroe Eliminado", 'Ver Lista!').onAction())
        ).subscribe({
          // Cuando el usuario hace clic en "Ver Lista!", navegamos a la lista de héroes
          next: () => this._router.navigate(['/heroes/list']),// Next se ejecut acuando un observable emite un valor
          // En caso de error (por ejemplo, si la eliminación falla), lo manejamos aquí
          error: err => console.error(err), // Error se ejecuta cuando un observable emite un error
          complete: () => console.warn('Completado') // Complete se ejecuta cuando un observable se completa
        });
      }

    );

  }

}
