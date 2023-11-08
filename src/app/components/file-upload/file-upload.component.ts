import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFiles: File[] = [];

  constructor(private fileUploadService: FileUploadService) { }

  onFileSelected(event: any) {
    const files: File[] = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
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
