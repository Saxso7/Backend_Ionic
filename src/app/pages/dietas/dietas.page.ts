import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { KeyValue } from '@angular/common';


@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.page.html',
  styleUrls: ['./dietas.page.scss'],
})
export class DietasPage implements OnInit {
  opcionesDietas: string[] = ["Entrenamiento de resistencia", "Entrenamiento cardiovascular", "Entrenamiento de alta intensidad (HIIT, CrossFit)","Pérdida de peso"];
  seleccionOpcion: string = '';
  dietasRes: any = { };
  dietaSeleccionada: KeyValue<string, any>; 
  data: any;


  constructor(private http: HttpClient) { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  api = inject(ApiService);



  ngOnInit() {
    this.api.getDietRes().subscribe((response) => {
      this.data = response;
      console.log(this.data);
  
      this.dietasRes = this.transformarDatosDietaRes(response);
      console.log(this.dietasRes);
    });
  }
  
  transformarDatosDietaRes(data: any) {
    const transformedData: any = {};
  
    for (let i = 0; i < data.length; i++) {
      const dieta = data[i];
      const id = dieta.id;
      
      // Verifica si ya existe la clave "Entrenamiento de resistencia" y si no, créala
      if (!transformedData["Entrenamiento de resistencia"]) {
        transformedData["Entrenamiento de resistencia"] = {};
      }
      
      transformedData["Entrenamiento de resistencia"][id] = {
        state: id,
        desayuno: dieta.desayuno,
        nombreDesayuno: dieta.nombreDesayuno,
        descripcionDesayuno: dieta.descripcionDesayuno,
        almuerzo: dieta.almuerzo,
        nombreAlmuerzo: dieta.nombreAlmuerzo,
        descripcionAlmuerzo: dieta.descripcionAlmuerzo,
        meriendaTarde: dieta.meriendaTarde,
        nombreMeriendaTarde: dieta.nombreMeriendaTarde,
        descripcionMeriendatarde: dieta.descripcionMeriendatarde,
        cena: dieta.cena,
        nombreCena: dieta.nombreCena,
        descripcionCena: dieta.descripcionCena,
        meriendaNocturna: dieta.meriendaNocturna,
        nombreMeriendaNocturna: dieta.nombreMeriendaNocturna,
        descripcionMeriendaNocturna: dieta.descripcionMeriendaNocturna
      };
    }
  
    return transformedData;
  }

  

  seleccionarDieta() {
    this.dietaSeleccionada = this.dietasRes[this.seleccionOpcion];
    console.log(this.dietaSeleccionada);
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

}
