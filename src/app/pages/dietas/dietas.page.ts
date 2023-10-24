import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.page.html',
  styleUrls: ['./dietas.page.scss'],
})
export class DietasPage implements OnInit {
  
  data: any;

  constructor() { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  api = inject(ApiService);

  diets: any[];
  typeDiet: string | null = null;
  selectedDiet: any = null;
  expandedDiet: any = null; 


  ngOnInit() {
    this.api.getDiet().subscribe((response) => {
      this.data = response;
      this.diets = this.data;
      console.log(this.diets);
    });
  }

  filterData() {
    if (this.typeDiet === null) {
      return [];
    } else {
      return this.diets.filter((diet) => diet.tipo === this.typeDiet);
    }
  }

  showDetails(diet: any) {
    this.selectedDiet = diet;
    this.expandedDiet = diet; // Establecer el elemento expandido
  }

  collapseDetails() {
    this.expandedDiet = null; // Colapsar la información
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
