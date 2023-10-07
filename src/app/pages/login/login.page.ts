// Importación de módulos y servicios necesarios
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models'; // Importa el modelo de usuario
import { FirebaseService } from 'src/app/services/firebase.service'; // Importa el servicio de Firebase
import { UtilsService } from 'src/app/services/utils.service'; // Importa un servicio de utilidades
import { ApiService } from 'src/app/services/api.service'; // Importa un servicio de API

@Component({
  selector: 'app-login', // Selector del componente
  templateUrl: './login.page.html', // Plantilla HTML asociada al componente
  styleUrls: ['./login.page.scss'], // Hoja de estilos asociada al componente
})
export class LoginPage implements OnInit {
  data: any; // Propiedad para almacenar datos

  // Definición del formulario con dos campos: email y contraseña
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // Campo de correo electrónico con validación
    password: new FormControl('', [Validators.required]), // Campo de contraseña con validación
  });

  // Inyección de servicios en propiedades del componente
  firebaseServ = inject(FirebaseService); // Servicio de Firebase
  utilsServ = inject(UtilsService); // Servicio de utilidades
  router = inject(Router); // Enrutador de la aplicación
  api = inject(ApiService); // Servicio de API

  constructor() { } // Constructor del componente

  ngOnInit() {
    // Método del ciclo de vida del componente que se ejecuta cuando se inicia
  }

  // Función asincrónica que se llama cuando se envía el formulario de inicio de sesión
  async submit() {
    if (this.form.valid) { // Verifica si el formulario es válido
      const loading = await this.utilsServ.loading(); // Muestra una pantalla de carga
      await loading.present(); // Espera a que la pantalla de carga se presente

      // Intenta iniciar sesión con los datos del formulario a través del servicio de Firebase
      this.firebaseServ.signIn(this.form.value as User).then(res => {
        // Manejo de éxito del inicio de sesión
        console.log(res); // Registra la respuesta en la consola
        this.utilsServ.presentToast({ // Muestra un mensaje de éxito
          message: 'Bienvenido: ' + this.form.value.email,
          duration: 3000,
          color: "primary",
          position: "middle",
          icon: "alert-circle-sharp"
        });
        this.router.navigate(['/main']); // Navega a la página principal
      }).catch(error => {
        // Manejo de error del inicio de sesión
        console.log(error); // Registra el error en la consola
        this.utilsServ.presentToast({ // Muestra un mensaje de error
          message: 'Error en el usuario y/o contraseña',
          duration: 3000,
          color: "primary",
          position: "middle",
          icon: "alert-circle-sharp"
        });
      }).finally(() => {
        loading.dismiss(); // Cierra la pantalla de carga
      });
    }
  }
}
