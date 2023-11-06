import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PopResarcimientoComponent } from '../pop-resarcimiento/pop-resarcimiento.component';


@Component({
  selector: 'app-resarcimiento',
  templateUrl: './resarcimiento.component.html',
  styleUrls: ['./resarcimiento.component.css']
})
export class ResarcimientoComponent {


  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(PopResarcimientoComponent, {
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Diálogo cerrado: ${result}`);
    });
  }

}
