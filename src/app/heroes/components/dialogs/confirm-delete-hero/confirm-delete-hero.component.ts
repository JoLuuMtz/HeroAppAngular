import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, matDialogAnimations, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../../interfaces/hero.interface';



@Component({
  selector: 'app-confirm-delete-hero',
  imports: [MaterialModule, CommonModule],
  templateUrl: './confirm-delete-hero.component.html',
  styles: [],
  standalone: true


})
export class ConfirmDeleteHeroComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteHeroComponent>);
  //recibe la data del heroe que se quiere eliminar por
  // inyeccion de dependencias cuando se llama el dialog
  readonly data = inject<Hero>(MAT_DIALOG_DATA);


  OpcionClick() {
    this.dialogRef.close();
  }
}
