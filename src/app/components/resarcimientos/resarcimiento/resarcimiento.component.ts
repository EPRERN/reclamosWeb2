import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PopResarcimientoComponent } from '../pop-resarcimiento/pop-resarcimiento.component';
import { CheckboxService } from '../../../services/checkbox.service';


@Component({
  selector: 'app-resarcimiento',
  templateUrl: './resarcimiento.component.html',
  styleUrls: ['./resarcimiento.component.css'],

})
export class ResarcimientoComponent implements OnInit{



  @Input() errorFacturacion: boolean = false;
  @Input() resarcimiento: boolean = false;
  @Input() suspencionSuministro: boolean = false;
  @Input() malaAtencionComercial: boolean = false;
  @Input() negativaConexion: boolean = false;
  @Input() inconvenienteTension: boolean = false;
  @Input() facturaFueraDeTermino: boolean = false;


  @Output() checkboxChange: EventEmitter<any> = new EventEmitter<any>();



  alMenosUnoMarcado: boolean = false;

  constructor(public dialog: MatDialog,private checkboxService: CheckboxService) { }


  ngOnInit(): void {
    this.checkboxService.setCheckboxState(
      this.errorFacturacion ||
        this.resarcimiento ||
        this.suspencionSuministro ||
        this.malaAtencionComercial ||
        this.negativaConexion ||
        this.inconvenienteTension ||
        this.facturaFueraDeTermino
    );
    
  }



   

  checkboxChanged(checkboxName: string, event: any) {
    const value = event.target.checked;
    this.checkboxChange.emit({ [checkboxName]: value });
  
    // Actualiza el servicio con el estado de los checkboxes
    this.checkboxService.setCheckboxState(
      this.errorFacturacion ||
        this.resarcimiento ||
        this.suspencionSuministro ||
        this.malaAtencionComercial ||
        this.negativaConexion ||
        this.inconvenienteTension ||
        this.facturaFueraDeTermino
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopResarcimientoComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }
}










  // checkboxChanged(checkboxName: string, event: any) {
  //   const value = event.target.checked;
  //   this.checkboxChange.emit({ [checkboxName]: value });


  //   // Verifica si al menos uno de los checkboxes está marcado
  //   this.alMenosUnoMarcado = this.errorFacturacion || this.resarcimiento || this.suspencionSuministro ||
  //     this.malaAtencionComercial || this.negativaConexion || this.inconvenienteTension ||
  //     this.facturaFueraDeTermino;
  // }