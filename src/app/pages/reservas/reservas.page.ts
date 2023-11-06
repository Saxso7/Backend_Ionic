import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { compareAsc, format } from 'date-fns'
import { parse, differenceInDays } from 'date-fns';



@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  formattedDate: string; // Declarar la propiedad formattedDate
  parsedDate: Date; // Declarar la propiedad parsedDate
  daysDifference: number; // Declarar la propiedad daysDifference




  constructor() { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);


  ngOnInit() {
    this.printDateInfo();
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
  printDateInfo() {
    const date = new Date();
    this.formattedDate = format(date, 'dd/MM/yyyy');
    console.log('Formatted Date:', this.formattedDate);

    const dateString = '2023-11-03';
    this.parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    console.log('Parsed Date:', this.parsedDate);

    const startDate = new Date('2023-11-01');
    const endDate = new Date('2023-11-10');
    this.daysDifference = differenceInDays(endDate, startDate);
    console.log('Days Difference:', this.daysDifference);
  }
}

 



