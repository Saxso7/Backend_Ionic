import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  data: any;
  

  firebaseServ = inject(FirebaseService);
  utilsServ = inject(UtilsService);
  router = inject(Router);
  api = inject(ApiService);

  users: any[];
  



  ngOnInit() {
    this.api.getData().subscribe((response) => {
      this.data = response;
      this.users = this.data;
      console.log(this.users);

      // Asegúrate de que la respuesta contenga los usuarios y sea un arreglo
      if (Array.isArray(this.data.users)) {
        // Obtén el rol del usuario autenticado desde localStorage
        const authenticatedEmail = localStorage.getItem('userEmail');
        console.log(authenticatedEmail)

        if (authenticatedEmail) {
          // Encuentra el usuario correspondiente al correo autenticado
          const user = this.data.users.find(user => user.email === authenticatedEmail);

          if (user) {
            // Si se encontró un usuario con el correo autenticado
            this.userRole = user.role; // Asigna el rol del usuario a la variable userRole
            console.log("El rol del usuario autenticado es: " + this.userRole);
          } else {
            // Si no se encontró un usuario con el correo autenticado
            console.log("No se encontró un usuario con el correo autenticado.");
          }
        } else {
          console.log("No se encontró el correo autenticado en localStorage.");
        }
      } else {
        console.error("La respuesta no contiene un arreglo de usuarios.");
      }
    });
    
    
  }
  userRole: string | undefined; // Simula el rol del usuario (puedes obtenerlo de tu sistema de autenticación)
  

  // Función para verificar si el usuario tiene el rol "admin"
  isUserAdmin(): boolean {
    return this.userRole === 'admin';
  }
  
  

  
  signOut() {
    // Eliminar el token de autenticación de localStorage
    localStorage.removeItem('userToken');

    localStorage.removeItem('userEmail');
    
    // Llamar al método de signOut de Firebase si es necesario
    this.firebaseServ.signOut();
    
    // Navegar a la página de inicio
    this.router.navigate(['/']);
  }

}
