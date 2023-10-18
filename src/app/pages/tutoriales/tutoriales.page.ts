import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule


@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.page.html',
  styleUrls: ['./tutoriales.page.scss'],
})
export class TutorialesPage implements OnInit {
  selectedOption: any = ''; // Define la propiedad selectedOption

  videoUrl: string[] = [
    "https://www.youtube.com/embed/EWcHFVxJPKg",
    "https://www.youtube.com/embed/zNDD4EbjORs",
    "https://www.youtube.com/embed/p4bwCz_CSVI",
    "https://www.youtube.com/embed/NFH358gXP28",    
    
  ];

  constructor(
    private sanitizer: DomSanitizer
  ) { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  ngOnInit() {
  }
  
  userRole: string = 'usuario'; // Simula el rol del usuario (puedes obtenerlo de tu sistema de autenticación)
  

  // Función para verificar si el usuario tiene el rol "admin"
  isUserAdmin(): boolean {
    return this.userRole === 'admin';
  }
  


  signOut() {
    // Eliminar el token de autenticación de localStorage
    localStorage.removeItem('userToken');
    
    // Llamar al método de signOut de Firebase si es necesario
    this.firebaseServ.signOut();
    
    // Navegar a la página de inicio
    this.router.navigate(['/']);
  }

  openMain() {
    // Abre la página de "Ubicaciones" con un pequeño retraso
    setTimeout(() => {
      this.router.navigate(['/main']);
    }, 400); // 300 milisegundos (ajusta este valor según tus necesidades)
  }
  videoTutorial(video: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(video);
  }


}
