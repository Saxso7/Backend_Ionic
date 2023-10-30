import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.page.html',
  styleUrls: ['./dietas.page.scss'],
})
export class DietasPage implements OnInit {
  opcionesDietas: string[] = ["Entrenamiento de resistencia", "Entrenamiento cardiovascular", "Entrenamiento de alta intensidad (HIIT, CrossFit)","Pérdida de peso"];
  seleccionOpcion: string = '';
  dietas: any = {
    "Entrenamiento de resistencia": 
      { 
        "state": "Opción 1",
        "desayuno": "Desayuno:",
        "nombreDesayuno": "Batido y frutas",       
        "descriptionDesayuno": "Avena cocida con frutas (plátano, fresas, o manzana), nueces y miel. Un batido de proteínas.",
        "almuerzo": "Almuerzo",
        "nombreAlmuerzo": "Ensalada de pollo",
        "descripcionAlmuerzo": "Ensalada de pollo a la parrilla con espinacas, tomates, nueces y aderezo de vinagreta balsámica. Quinua cocida.",
        "meriendaTarde": "Merienda tarde",
        "nombreMeriendaTarde": "Nueces o almendras",
        "descripcionMeriendatarde": "Un puñado de nueces o almendras",
        "cena": "Cena",
        "nombreCena": "Salmón al horno con verduras",
        "descripcionCena": " Salmón a la parrilla con espárragos y quinua. Ensalada de pepino y tomate con aderezo de .yogurt",
        "meriendaNocturna": "Merienda Nocturna",
        "nombreMeriendaNocturna": "Batido de proteínas",
        "descriptionMeriendaNocturna": "Batido de proteínas con espinacas, plátano y leche de almendra",

        "state2": "Opción 2",
        "desayuno2": "Desayuno:",
        "nombreDesayuno2": "Yogurt con frutas",       
        "descriptionDesayuno2": "Yogurt griego bajo en grasa con granola y bayas. Un huevo duro",
        "almuerzo2": "Almuerzo",
        "nombreAlmuerzo2": "Sandwich con verduras",
        "descripcionAlmuerzo2": "Sándwich de pavo integral con aguacate, espinacas y mostaza. Zanahorias baby y hummus.",
        "meriendaTarde2": "Merienda tarde",
        "nombreMeriendaTarde2": "Manzana con mantequilla de almendra.",
        "descripcionMeriendatarde2": "Manzana con mantequilla de almendra.",
        "cena2": "Cena",
        "nombreCena2": "Tacos con Verduras",
        "descripcionCena2": "Tacos de pavo molido en hojas de lechuga con aguacate, tomate y pimientos. Frijoles negros cocidos.",
        "meriendaNocturna2": "Merienda Nocturna",
        "nombreMeriendaNocturna2": "Batido de proteínas",
        "descriptionMeriendaNocturna2": "Batido de yogurt griego con bayas y almendras."  
      },
      "Entrenamiento cardiovascular":
      {
        "state": "Opción 1",
        "desayuno": "Desayuno:",
        "nombreDesayuno": "Avena con frutas y nueces",       
        "descriptionDesayuno": "Avena cocida con plátano, fresas y nueces. Añade miel al gusto.	",
        "almuerzo": "Almuerzo",
        "nombreAlmuerzo": "Ensalada de pollo a la parrilla",
        "descripcionAlmuerzo": "Ensalada con pechuga de pollo a la parrilla, espinacas, tomates, nueces y aderezo de vinagreta balsámica.",
        "meriendaTarde": "Merienda tarde",
        "nombreMeriendaTarde": "Batido de proteínas",
        "descripcionMeriendatarde": "Batido de proteínas con espinacas, plátano y leche de almendra",
        "cena": "Cena",
        "nombreCena": "Salmón al horno con brócoli",
        "descripcionCena": "Salmón al horno con brócoli y espárragos. Rocía con aceite de oliva y limón.",
        "meriendaNocturna": "Merienda Nocturna",
        "nombreMeriendaNocturna": "Yogurt griego con bayas",
        "descriptionMeriendaNocturna": "Yogurt griego bajo en grasa con bayas frescas y una pizca de miel.",

        "state2": "Opción 2",
        "desayuno2": "Desayuno:",
        "nombreDesayuno2": "Batido de frutas y proteínas",       
        "descriptionDesayuno2": "Batido con plátano, espinacas, proteína en polvo y leche de almendra.",
        "almuerzo2": "Almuerzo",
        "nombreAlmuerzo2": "Ensalada de atún",
        "descripcionAlmuerzo2": "Ensalada con atún enlatado, garbanzos, pepinos, tomates y aderezo de aceite de oliva y limón.",
        "meriendaTarde2": "Hummus y vegetales",
        "nombreMeriendaTarde2": "Nueces o almendras",
        "descripcionMeriendatarde2": "Zanahorias baby, apio y pimientos con hummus como dip.",
        "cena2": "Cena",
        "nombreCena2": "Salmón al horno con espárragos",
        "descripcionCena2": "Salmón al horno con espárragos y una salsa de mostaza y miel.",
        "meriendaNocturna2": "Merienda Nocturna",
        "nombreMeriendaNocturna2": "Yogurt con nueces y miel",
        "descriptionMeriendaNocturna2": "Yogurt griego con nueces y una cucharada de miel."

      },
      "Entrenamiento de alta intensidad (HIIT, CrossFit)":
      {
        "state": "Opción 1",
        "desayuno": "Desayuno:",
        "nombreDesayuno": "Batido de proteínas y avena",       
        "descriptionDesayuno": "Batido con proteína en polvo, avena, plátano y leche de almendra.",
        "almuerzo": "Almuerzo",
        "nombreAlmuerzo": "Tacos de pollo a la parrilla",
        "descripcionAlmuerzo": "Tacos con pollo a la parrilla, aguacate, lechuga y salsa picante.",
        "meriendaTarde": "Merienda tarde",
        "nombreMeriendaTarde": "Yogurt con frutas y nueces",
        "descripcionMeriendatarde": "Yogurt griego con fresas, arándanos y nueces.",
        "cena": "Cena",
        "nombreCena": "Tofu salteado con vegetales",
        "descripcionCena": "Tofu salteado con brócoli, zanahorias y champiñones en salsa de soja.",
        "meriendaNocturna": "Merienda Nocturna",
        "nombreMeriendaNocturna": "Huevos duros",
        "descriptionMeriendaNocturna": "Huevos duros con una pizca de sal.",

        "state2": "Opción 2",
        "desayuno2": "Desayuno:",
        "nombreDesayuno2": "Tostadas de palta y huevo",       
        "descriptionDesayuno2": "Tostadas integrales con palta y huevo pochado. Añade espinacas si lo deseas.",
        "almuerzo2": "Almuerzo",
        "nombreAlmuerzo2": "Ensalada de pavo",
        "descripcionAlmuerzo2": "Ensalada con pavo a la parrilla, garbanzos, tomates, aguacate y aderezo de yogurt.",
        "meriendaTarde2": "Merienda tarde",
        "nombreMeriendaTarde2": "Batido de proteínas y espinacas",
        "descripcionMeriendatarde2": "Batido con proteína en polvo, espinacas, plátano y leche de almendra.",
        "cena2": "Cena",
        "nombreCena2": "Salmón al horno con espárragos",
        "descripcionCena2": "Salmón al horno con espárragos y una salsa de mostaza y miel.",
        "meriendaNocturna2": "Merienda Nocturna",
        "nombreMeriendaNocturna2": "Batido de proteínas",
        "descriptionMeriendaNocturna2": "Batido de proteínas con espinacas, plátano y leche de almendra."

      },
      "Pérdida de peso":
      {
        "state": "Opción 1",
        "desayuno": "Desayuno:",
        "nombreDesayuno": "Batido de proteínas y espinacas",       
        "descriptionDesayuno": "Batido con proteína en polvo, espinacas, plátano y leche de almendra.",
        "almuerzo": "Almuerzo",
        "nombreAlmuerzo": "Ensalada de pollo a la parrilla",
        "descripcionAlmuerzo": "Ensalada con pechuga de pollo a la parrilla, espinacas, tomates, nueces y aderezo de vinagreta balsámica.",
        "meriendaTarde": "Merienda tarde",
        "nombreMeriendaTarde": "Yogurt con frutas y nueces",
        "descripcionMeriendatarde": "Yogurt griego con fresas, arándanos y nueces.",
        "cena": "Cena",
        "nombreCena": "Pechuga de pavo con brócoli",
        "descripcionCena": "Pechuga de pavo a la parrilla con brócoli al vapor. Añade limón y especias al gusto.",
        "meriendaNocturna": "Merienda Nocturna",
        "nombreMeriendaNocturna": "Huevos duros",
        "descriptionMeriendaNocturna": "Huevos duros con una pizca de sal.",

        "state2": "Opción 2",
        "desayuno2": "Desayuno:",
        "nombreDesayuno2": "Avena con frutas y nueces",       
        "descriptionDesayuno2": "Avena cocida con plátano, fresas y nueces. Añade miel al gusto.",
        "almuerzo2": "Almuerzo",
        "nombreAlmuerzo2": "Ensalada de atún",
        "descripcionAlmuerzo2": "Ensalada con atún enlatado, garbanzos, pepinos, tomates y aderezo de aceite de oliva y limón.",
        "meriendaTarde2": "Merienda tarde",
        "nombreMeriendaTarde2": "Batido de proteínas",
        "descripcionMeriendatarde2": "Batido de proteínas con espinacas, plátano y leche de almendra.",
        "cena2": "Cena",
        "nombreCena2": "Tofu salteado con vegetales",
        "descripcionCena2": "Tofu salteado con brócoli, zanahorias y champiñones en salsa de soja.",
        "meriendaNocturna2": "Merienda Nocturna",
        "nombreMeriendaNocturna2": "t con nueces y miel",
        "descriptionMeriendaNocturna2": "Yogurt griego con nueces y una cucharada de miel."}  
  };
  dietaSeleccionada: any;
  


  constructor(private http: HttpClient) { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  api = inject(ApiService);

  


  ngOnInit() {
    
  }
  seleccionarDieta() {
    this.dietaSeleccionada = this.dietas[this.seleccionOpcion];
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
