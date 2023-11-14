import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-easter',
  templateUrl: './easter.component.html',
  styleUrls: ['./easter.component.css']
})
export class EasterComponent {
  showPopup = false;

  constructor(private popupService: PopupService, private router:Router) { }

  ngOnInit(): void {
    this.popupService.isOpen$.subscribe((isOpen) => {
      this.showPopup = isOpen;
      console.log('Estado del popup:', isOpen);
      if (isOpen) {
        console.log('Mostrando el popup');
      } else {
        console.log('Ocultando el popup');
      }
    });
  }

  openLinkedin(){
    const linkedinURL = 'https://ar.linkedin.com/in/lautaro-avila-31307b19a'; // Aquí debes poner la URL de tu perfil de LinkedIn
    window.open(linkedinURL, '_blank');
  }
  contact(): void {
    const email = 'lavila@eprern.gov.ar';
    const subject = 'Consulta'; 
    const body = 'Hola Lautaro,'; 
  
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
  
    window.location.href = mailtoLink;
  }
}

