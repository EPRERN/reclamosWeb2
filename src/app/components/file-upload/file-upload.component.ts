import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  constructor(private fileUploadService: FileUploadService) { }

 
  uploadFiles(fileInput: any) {
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
      this.fileUploadService.uploadFile(files[i]).subscribe(
        (response) => {
          console.log('Archivo subido exitosamente', response);
        },
        (error) => {
          console.error('Fallo al subir el archivo', error);
        }
      );
    }
  }

}
