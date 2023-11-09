import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFiles: File[] = [];
  files: File[] = [];
  maxSize: number = 10 * 1024 * 1024; // 10 MB en bytes
  errorMessage: string = '';
  isButtonDisabled: boolean = false;

  constructor(private fileUploadService: FileUploadService) { }

 
  onFileSelected(event: any) {
    const files: File[] = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > this.maxSize) {
        this.errorMessage =
          'El tamaño del archivo excede el límite permitido de 10MB. Intente comprimir los archivos, si no sabe cómo, haga clic <a href="https://www.winrar.es/soporte/compresion/40/como-comprimir-ficheros-con-winrar" target="_blank">aquí</a>.';
        this.isButtonDisabled = true;
        this.files = [];
        return;
      }
      this.files.push(files[i]);
    }
  }


  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }
}



  // uploadFiles() {
  //   for (let i = 0; i < this.selectedFiles.length; i++) {
  //     this.fileUploadService.uploadFile(this.selectedFiles[i]).subscribe(
  //       (response) => {
  //         console.log('Archivo subido exitosamente', response);
  //       },
  //       (error) => {
  //         console.error('Fallo al subir el archivo', error);
  //       }
  //     );
  //   }
  // }
// }
