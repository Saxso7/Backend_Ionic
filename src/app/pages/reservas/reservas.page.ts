import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReservaService } from '../../services/reserva.service';
import { ToastController } from '@ionic/angular';





@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  selectedGym: string;
  selectedDate: string;
  selectedTime: string;
  gyms: Gym[] = [];
  datesAvailable: string[] = [];
  hoursAvailable: string[] = [];
  reservationId: string;
  reservas: any[] = [];


  constructor(private http: HttpClient, private reservaService: ReservaService,private toastController: ToastController ) { }
  firebaseServ = inject(FirebaseService);
  router = inject(Router);


  ngOnInit(
    
  ) {
    this.getGyms().subscribe((data: any) => {
      this.gyms = data.data;
    });
    
    
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
  getGyms() {
    return this.http.get('assets/productos/listaGyms.json');
  }
  onGymChange() {
    // Obtener el gimnasio seleccionado
    const selectedGymData = this.gyms.find((gym) => gym.title === this.selectedGym);
    if (selectedGymData) {
      // Cargar las fechas disponibles
      this.datesAvailable = selectedGymData.datesAvailable.map((dateData) => dateData.date);
    } else {
      this.datesAvailable = []; // Limpiar las fechas si no se selecciona un gimnasio válido
    }
  }
  onDateChange() {
    // Obtener el gimnasio y la fecha seleccionados
    const selectedGymData = this.gyms.find((gym) => gym.title === this.selectedGym);
    const selectedDateData = selectedGymData?.datesAvailable.find((dateData) => dateData.date === this.selectedDate);
  
    if (selectedDateData) {
      // Cargar las horas disponibles
      this.hoursAvailable = selectedDateData.hoursAvailable;
    } else {
      this.hoursAvailable = []; // Limpiar las horas si no se selecciona una fecha válida
    }
  }
  submitReservation() {
    let reserva = {};
    if (this.selectedGym && this.selectedDate && this.selectedTime) {
      // Los valores necesarios están seleccionados, puedes enviar la reserva a Firebase
      const reservationData = {
        gym: this.selectedGym,
        date: this.selectedDate,
        time: this.selectedTime
      };
      let reserva = { ...reservationData };
      this.reservaService.agregarReserva(reserva);
      console.log('Datos de la reserva:', reservationData);

      this.toastController.create({
        message: 'Reserva realizada con éxito',
        duration: 2500,
        position: 'bottom'
      }).then((toast) => {
        toast.present();
      });
  
      // Aquí deberías utilizar las funciones de Firebase para enviar los datos, por ejemplo:
      // this.firebaseService.createReservation(reservationData)
      // Asegúrate de que tengas una función "createReservation" en tu servicio Firebase.
  
      // Luego puedes redirigir al usuario a otra página o mostrar un mensaje de éxito.
      // this.router.navigate(['/otra-pagina']);
    } else {
      // Faltan valores, muestra un mensaje de error o realiza alguna acción adecuada.
      console.log('Debes seleccionar un gimnasio, una fecha y una hora');
    }
  }
  goCheckin(){
    this.router.navigate(['/checkin']);
  };
}


interface Gym {
  title: string;
  latitude: number;
  longitude: number;
  address: string;
  horario: string;
  datesAvailable: { date: string; hoursAvailable: string[] }[]; // Corrección
}

 



