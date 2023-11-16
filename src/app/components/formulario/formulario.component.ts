import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxService } from 'src/app/services/checkbox.service';
import { EmailService } from 'src/app/services/email.service';
import { PopupService } from 'src/app/services/popup.service';
import Swal from 'sweetalert2';


import { MatDialog } from '@angular/material/dialog';
import { EasterComponent } from '../easter/easter.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() isDisabled: boolean = false;
  formularioReclamo!: FormGroup;
  formularios: any;
  files: File[] = [];


  errorMessage: string = '';
  isButtonDisabled: boolean = true;
  showPopup = false;


  constructor(public fb: FormBuilder, private emailService: EmailService,
    private checkboxService: CheckboxService,
    private popupService:PopupService,
    private router:Router,
    public dialog:MatDialog
  ) { }

  localidades: any[] = [
    { localidad: 'Aguada Guzman', codigoPostal: '8333' },
    { localidad: 'Arroyo de la Ventana', codigoPostal: '8168' },
    { localidad: 'Arroyo Los Berros', codigoPostal: '8521' },
    { localidad: 'Balneario El Condor', codigoPostal: '8501' },
    { localidad: 'Balneario El Salado', codigoPostal: '8351' }, 
    { localidad: 'Balsa Las Perlas', codigoPostal: '8324' },
    { localidad: 'Barda del Medio', codigoPostal: '8305' },
    { localidad: 'Campo Grande', codigoPostal: '8305' },
    { localidad: 'Catriel', codigoPostal: '8307' },
    { localidad: 'Cerro Policia', codigoPostal: '8333' },
    { localidad: 'Cervantes', codigoPostal: '8326' },
    { localidad: 'Chelforo', codigoPostal: '8326' },
    { localidad: 'Chichinales', codigoPostal: '8326' },
    { localidad: 'Chimpay', codigoPostal: '8364' },
    { localidad: 'Choele Choel', codigoPostal: '8360' },
    { localidad: 'Cinco Saltos', codigoPostal: '8303' },
    { localidad: 'Cipolletti', codigoPostal: '8324' },
    { localidad: 'Clemente Onelli', codigoPostal: '8416' },
    { localidad: 'Coronel Belisle', codigoPostal: '8364' },
    { localidad: 'Colonia Julia y Echarren', codigoPostal: '8138' },
    { localidad: 'Comallo', codigoPostal: '8416' },
    { localidad: 'Cona Niyeu', codigoPostal: '8521' },
    { localidad: 'Contralmirante Cordero', codigoPostal: '8301' },
    { localidad: 'Contralmirante Guerrico', codigoPostal: '8328' },
    { localidad: 'Darwin', codigoPostal: '8364' },
    { localidad: 'Dina Huapi', codigoPostal: '8402' },
    { localidad: 'El Cain', codigoPostal: '8422' },
    { localidad: 'El Cuy', codigoPostal: '8333' },
    { localidad: 'El Foyel', codigoPostal: '8401' },
    { localidad: 'El Manso', codigoPostal: '8430' },
    { localidad: 'Ferri', codigoPostal: '8301' },
    { localidad: 'General Roca', codigoPostal: '8332' },
    { localidad: 'General Conesa', codigoPostal: '8503' },
    { localidad: 'General Enrique Godoy', codigoPostal: '8336' },
    { localidad: 'General Fernandez Oro', codigoPostal: '8326' },
    { localidad: 'Guardia Mitre', codigoPostal: '8505' },
    { localidad: 'Ingeniero Huergo', codigoPostal: '8334' },
    { localidad: 'Ingeniero Jacobacci', codigoPostal: '8418' },
    { localidad: 'J.J. Gomez', codigoPostal: '8333' },
    { localidad: 'La Loberia', codigoPostal: '8501' },
    { localidad: 'Lago Pellegrini', codigoPostal: '8305' },
    { localidad: 'Lamarque', codigoPostal: '8363' },
    { localidad: 'Las Grutas', codigoPostal: '8521' },
    { localidad: 'Los Menucos', codigoPostal: '8424' },
    { localidad: 'Luis Beltran', codigoPostal: '8361' },
    { localidad: 'Mainque', codigoPostal: '8326' },
    { localidad: 'Mallin Ahogado', codigoPostal: '8430' },
    { localidad: 'Maquinchao', codigoPostal: '8422' },
    { localidad: 'Mencue', codigoPostal: '8417' },
    { localidad: 'Nahuel Niyeu', codigoPostal: '8536' },
    { localidad: 'Ñorquinco', codigoPostal: '8415' },
    { localidad: 'Paso Cordoba', codigoPostal: '8333' },
    { localidad: 'Peñas Blancas', codigoPostal: '8307' },
    { localidad: 'Pilcaniyeu', codigoPostal: '8412' },
    { localidad: 'Pomona', codigoPostal: '8378' },
    { localidad: 'Punta Colorada', codigoPostal: '8532' },
    { localidad: 'Ramos Mexia', codigoPostal: '8534' },
    { localidad: 'Rio Chico', codigoPostal: '8415' },
    { localidad: 'Rio Colorado', codigoPostal: '8138' },
    { localidad: 'Rio Villegas', codigoPostal: '8401' },
    { localidad: 'San Antonio Oeste', codigoPostal: '8520' },
    { localidad: 'San Carlos de Bariloche', codigoPostal: '8400' },
    { localidad: 'San Javier', codigoPostal: '8501' },
    { localidad: 'Sargento Vidal', codigoPostal: '8305' },
    { localidad: 'Sierra Colorada', codigoPostal: '8434' },
    { localidad: 'Sierra Grande', codigoPostal: '8532' },
    { localidad: 'Sierra Paileman', codigoPostal: '8521' },
    { localidad: 'Stefenelli', codigoPostal: '8332' },
    { localidad: 'Valcheta', codigoPostal: '8536' },
    { localidad: 'Valle Azul', codigoPostal: '8336' },
    { localidad: 'Valle Verde', codigoPostal: '5115' }, 
    { localidad: 'Viedma', codigoPostal: '8500' },
    { localidad: 'Villa Alberdi', codigoPostal: '8336' },
    { localidad: 'Villa Llanquin', codigoPostal: '8401' },
    { localidad: 'Villa Manzano', codigoPostal: '8308' },
    { localidad: 'Villa Mascardi', codigoPostal: '8401' },
    { localidad: 'Villa Regina', codigoPostal: '8363' },
    { localidad: 'Playas Doradas', codigoPostal: '8532' },
    { localidad: 'El Bolsón', codigoPostal: '8430' },
    { localidad: 'El Bolson', codigoPostal: '8430' },
    { localidad: 'Allen', codigoPostal: '8326' },
    { localidad: 'San Antonio Este', codigoPostal: '8521' },

  ];


  updatePostalCode(event: any) {
    const selectedLocality = event.target.value;
    const selectedObject = this.localidades.find(item => item.localidad === selectedLocality);
    if (selectedObject) {
      this.formularioReclamo.patchValue({
        localidad: selectedObject.localidad, // si quieres mostrar el nombre de la localidad seleccionada en el campo de selección
        codigoPostal: selectedObject.codigoPostal
      });
    }
  }




  ngOnInit(): void {
    this.showWelcomePopup();
    this.formularioReclamo = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: [''],

      checkNombrePropio: [false],
      nombreRepresentante: [''],
      apellidoRepresentante: [''],
      dniRepresentante: [''],

      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],

      direccionAlternativa: [''],
      localidadAlternativa: [''],
      codigoPostalAlternativo: [''],


      nis: [''],
      numeroDeCliente: [''],

      email: [''],


      errorFacturacion: [false],
      resarcimiento: [false],
      suspencionSuministro: [false],
      malaAtencionComercial: [false],
      negativaConexion: [false],
      inconvenienteTension: [false],
      facturaFueraDeTermino: [false],

      descripcion: [''],

      emailNotifications: [false],



      files: ['']
    });
    this.checkboxService.getCheckboxState().subscribe((state) => {
      // console.log('Estado actual de los checkboxes:', state);
      // this.isDisabled = !state;
      this.isButtonDisabled = !state;
    });

  }

  showWelcomePopup() {
     Swal.fire({
      title: '<br><h1><FONT size=7 color=#94ca4d><strong><u>¡Bienvenido!<u></FONT></strong></h1>',
      html: '<h2>Por favor, lea atentamente los campos antes de completar el formulario.<br> <FONT color="red">Los Campos con (*) son OBLIGATORIOS</FONT></h2>',
      imageUrl:'../../assets/Epre.png',
      // icon: 'warning',
      confirmButtonText: 'Entendido'
    });
  }


  isChecked1: boolean = false;

  isChecked2: boolean = false;
  isChecked3: boolean = false;

  toggleEmailInput() {
    const emailControl = this.formularioReclamo.get('email');
    if (emailControl && !this.isChecked2) {
      emailControl.setValue(null);
    }
    this.isChecked2 = !this.isChecked2;
  }
  togglecheckNombrePropioInput() {
    this.isChecked3 = !this.isChecked3;
  }


  //CHECKBOX DE COINCIDE CON DATOS 
  isChecked: boolean = false;




  copiarLocalidad(event: any) {
    const localidadValue = this.formularioReclamo.get('localidad')?.value;
    if (event.target.checked && localidadValue) {
      this.formularioReclamo.get('localidadAlternativa')?.setValue(localidadValue);
    } else {
      this.formularioReclamo.get('localidadAlternativa')?.setValue('');
    }
  }
  copiarCodigoPostal() {
    const codigoPostalValue = this.formularioReclamo.get('codigoPostal')?.value;
    if (this.isChecked && codigoPostalValue) {
      this.formularioReclamo.get('codigoPostalAlternativo')?.setValue(codigoPostalValue);
    } else {
      this.formularioReclamo.get('codigoPostalAlternativo')?.setValue('');
    }
  }
  copiarDireccion() {
    const direccionValue = this.formularioReclamo.get('direccion')?.value;
    if (this.isChecked && direccionValue) {
      this.formularioReclamo.get('direccionAlternativa')?.setValue(direccionValue);
    } else {
      this.formularioReclamo.get('direccionAlternativa')?.setValue('');
    }
  }





  onCheckboxChange(event: any) {
    this.isChecked = event.target.checked;
    this.copiarLocalidad(event);
    this.copiarCodigoPostal();
    this.copiarDireccion();
  }






  private showSweetAlertSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Enviado!...',
      text: 'Se han enviado sus datos, gracias!',

    });
  }







  onSubmit() {

    if (this.formularioReclamo.valid) {

      // console.log('Valor de descripcion:', this.formularioReclamo.value.descripcion);

      const formData = new FormData();

      Object.keys(this.formularioReclamo.value).forEach((key) => {
        const value = this.formularioReclamo.value[key];

        // Verificar si es un array antes de intentar iterar
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      // console.log('Archivos seleccionados:', this.files);

      if (this.files.length > 0) {
        this.files.forEach((file, index) => {
          formData.append('files', file, file.name);
        });
      } else {
        // console.log('No se han seleccionado archivos');
      }

      console.log('FormData:', formData);

      this.showSweetAlertSuccess();

      this.emailService.sendEmailWithAttachment(formData).subscribe(
        (response) => {
          // console.log('Correo electrónico enviado con éxito', response);
        },
        (error) => {
          // console.error('Error al enviar el correo electrónico:', error);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        html: '<h1><FONT color="red">Por favor, complete todos los campos obligatorios antes de enviar el formulario.</FONT></h1>',
      });
    }

  }



  checkboxChanged(checkboxData: any) {
    this.formularioReclamo.patchValue(checkboxData);
  }

  onFileSelected(files: FileList) {
    this.files = Array.from(files);
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(EasterComponent, {
      width: '480px', 
      height:'550px',
      
    });
  }


}




























// updatePostalCodeAlternativo(event:any){
//   const selectedLocalidadAlternativa = event.target.value;
//   const selectedObjectAlternativo = this.localidadesAlternativas2.find(item => item.localidad2 === selectedLocalidadAlternativa);
//   if(selectedObjectAlternativo){
//     this.formularioReclamo.patchValue({
//       localidad2: selectedObjectAlternativo.localidad2,
//       codigoPostal2: selectedObjectAlternativo.codigoPostal2
//     });
//   }
// }