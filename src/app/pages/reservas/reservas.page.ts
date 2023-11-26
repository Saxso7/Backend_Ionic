import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReservaService } from '../../services/reserva.service';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';





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
  user: any;
  DateAvaible: any;
  dates: []=[];


  constructor(private http: HttpClient, 
              private reservaService: ReservaService,
              private toastController: ToastController,
              private api: ApiService,
              private afAuth: AngularFireAuth,
              private firebaseServ: FirebaseService,
              private alertController: AlertController,
              private router:Router ) { }


  async ngOnInit(
    
  ) {
    this.api.getData().subscribe((response) => {
    this.DateAvaible = response;
    this.dates = this.DateAvaible.availability_data;
    console.log(this.dates)
    })
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Si hay un usuario autenticado, lo almacenamos en la propiedad user
        this.user = user.email;
        console.log(this.user)
      }
    });
    await this.api.getGym().subscribe((data: any) => {
      this.gyms = data.gyms.map(gym => {
        return {
          user: this.user,
          title: gym.nombre,
          address: gym.direccion,
          datesAvailable: this.DateAvaible.availability_data.map(availabilityData => {
            return {
              date: availabilityData.fechasDisponibles || 'Fecha no disponible',
              hoursAvailable: availabilityData.hora || []
            };
          })
          
        };
      });
      console.log(this.gyms)
    
  })

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
// ... (otro código)

async submitReservation() {
  if (this.selectedGym && this.selectedDate && this.selectedTime) {
    // Obtener el gimnasio seleccionado
    const selectedGymData = this.gyms.find((gym) => gym.title === this.selectedGym);
    if (selectedGymData) {
      // Construir los datos de la reserva
      const reservationData = {
        usuario: this.user,
        nombreGym: selectedGymData.title,
        direccion: selectedGymData.address,
        horaAgendada: this.selectedTime,
        fechaAgendada: this.selectedDate
      };

      // Crear una alerta para confirmar la reserva
      const alert = await this.alertController.create({
        header: 'Confirmar Reserva',
        message: `¿Estás seguro de que quieres hacer la reserva en ${selectedGymData.title} para el ${this.selectedDate} a las ${this.selectedTime}?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Reserva cancelada por el usuario');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              // Llamar a la función postRes() de tu servicio API
              this.api.postRes(reservationData)
                .subscribe((response) => {
                  // Manejar la respuesta de la API si es necesario
                  console.log('Respuesta de la API:', response);

                  // Resto del código para manejar la respuesta, redirección, etc.
                  this.reservaService.agregarReserva(reservationData);

                  // Crear una nueva alerta para indicar que la reserva se realizó con éxito
                  this.alertController.create({
                    header: 'Reserva Exitosa',
                    message: 'La reserva se realizó con éxito',
                    buttons: ['OK']
                  }).then((successAlert) => {
                    successAlert.present();
                  });

                  // Redirigir al usuario u otras acciones necesarias
                  // this.router.navigate(['/otra-pagina']);
                }, (error) => {
                  // Manejar errores de la solicitud POST
                  console.error('Error al realizar la reserva:', error);

                  // Muestra un mensaje de error o realiza alguna acción adecuada
                });
            }
          }
        ]
      });

      // Mostrar la alerta de confirmación
      await alert.present();
    } else {
      console.log('Gimnasio no encontrado');
    }
  } else {
    console.log('Debes seleccionar un gimnasio, una fecha y una hora');
  }
}

  
  goCheckin(){
    this.router.navigate(['/checkin']);
  };
}


interface Gym {
  title: string;
  user: string;
  address: string;
  datesAvailable: { date: string; hoursAvailable: string[] }[]; // Corrección
}

 



