import { ChangeDetectorRef, Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent {
  selectedFiles: File[] = [];
  maxSize: number = 10 * 1024 * 1024; // 10 MB en bytes
  errorMessage: string = '';


  @Output() filesSelected: EventEmitter<FileList> = new EventEmitter<FileList>();


  writeValue(value: any): void {
    if (value) {
      this.selectedFiles = value;
    }
  }
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {
    
  }
  constructor(private cdr: ChangeDetectorRef) { }

 
  onFileSelected(event: any) {

    const files: FileList = event.target.files;
    console.log('Archivos seleccionados:', files);

    this.filesSelected.emit(files);

    
    let totalSize = this.getTotalSize();

   
    for (let i = 0; i < files.length; i++) {
      if (totalSize + files[i].size > this.maxSize) {
        this.errorMessage = 'El tamaño total de los archivos excede el límite permitido de 10MB.';
        this.showSweetAlertError();
        this.clearFiles();
        return;
      }
    }

   
    this.selectedFiles.push(...Array.from(files));
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  clearFiles() {
   
    this.selectedFiles = [];
    this.errorMessage = ''; 
    
  }

  private getTotalSize(): number {
    let totalSize = 0;

   
    for (let i = 0; i < this.selectedFiles.length; i++) {
      totalSize += this.selectedFiles[i].size;
    }

    return totalSize;
  }
  

  private showSweetAlertError() {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'El tamaño total de los archivos excede el límite permitido de 10MB.',
      footer: '<br> <a href="https://www.winrar.es/soporte/compresion/40/como-comprimir-ficheros-con-winrar" target="_blank">Cómo comprimir los archivos con Winrar para ahorrar Espacio</a> <br><br>  <a href="https://www.winrar.es/descargas/winrar" target="_blank">(No tengo Winrar)</a>',
      
    });
  }
 
  
}
